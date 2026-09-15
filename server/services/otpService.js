import mongoose from 'mongoose';
import User from '../models/User.js';
import Worker from '../models/Worker.js';
import OTPVerification from '../models/OTPVerification.js';
import ApiError from '../utils/ApiError.js';
import generateToken from '../utils/generateToken.js';
import { normalizeIdentifier, generateSecureOTP, hashOTP, verifyOTPHash } from '../utils/otpUtils.js';
import { sendOTPEmail } from './emailService.js';
import { sendOTPSMS } from './smsService.js';
import { MOCK_USERS_STORE, MOCK_WORKERS_STORE } from './authService.js';

// In-memory fallback map for offline DB mode / development testing
const IN_MEMORY_OTP_STORE = new Map();

/**
 * Sends a 6-digit cryptographically secure OTP for signup or login
 */
export const sendOTP = async ({ identifier, channel, purpose, name, role }) => {
  if (!identifier || !channel || !purpose) {
    throw ApiError.badRequest('Identifier, channel, and purpose are required');
  }

  if (!['email', 'sms'].includes(channel)) {
    throw ApiError.badRequest("Channel must be 'email' or 'sms'");
  }

  if (!['signup', 'login'].includes(purpose)) {
    throw ApiError.badRequest("Purpose must be 'signup' or 'login'");
  }

  const normalizedId = normalizeIdentifier(identifier, channel);

  // 1. Role & Identity validations for SIGNUP
  if (purpose === 'signup') {
    if (role && role.toLowerCase() === 'admin') {
      throw ApiError.badRequest('Admin registration is strictly forbidden. Only customer and worker registrations are permitted.');
    }

    if (!role || !['customer', 'worker'].includes(role.toLowerCase())) {
      throw ApiError.badRequest("Role must be 'customer' or 'worker'");
    }

    if (!name || name.trim().length < 2) {
      throw ApiError.badRequest('Name must be at least 2 characters long');
    }

    // Check duplicate account
    let existingUser = null;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      existingUser = await User.findOne(
        channel === 'email' ? { email: normalizedId } : { phone: normalizedId }
      );
    } else {
      for (const u of MOCK_USERS_STORE.values()) {
        if ((channel === 'email' && u.email === normalizedId) || (channel === 'sms' && u.phone === normalizedId)) {
          existingUser = u;
          break;
        }
      }
    }
    if (existingUser) {
      throw new ApiError(409, `An account with this ${channel === 'email' ? 'email address' : 'mobile number'} already exists. Please log in instead.`);
    }
  }

  // 2. Identity validations for LOGIN
  if (purpose === 'login') {
    let existingUser = null;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      existingUser = await User.findOne(
        channel === 'email' ? { email: normalizedId } : { phone: normalizedId }
      );
    } else {
      for (const u of MOCK_USERS_STORE.values()) {
        if ((channel === 'email' && u.email === normalizedId) || (channel === 'sms' && u.phone === normalizedId)) {
          existingUser = u;
          break;
        }
      }
    }

    if (!existingUser) {
      throw ApiError.notFound(`No account registered with this ${channel === 'email' ? 'email address' : 'mobile number'}. Please sign up first.`);
    }

    if (existingUser.isActive === false) {
      throw ApiError.unauthorized('Account is deactivated. Please contact support.');
    }
  }

  // 3. Resend cooldown check
  const now = new Date();
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    const activeOTP = await OTPVerification.findOne({
      identifier: normalizedId,
      purpose,
      consumedAt: null,
      expiresAt: { $gt: now }
    }).sort({ createdAt: -1 });

    if (activeOTP && activeOTP.resendCooldownUntil && activeOTP.resendCooldownUntil > now) {
      const waitSeconds = Math.ceil((activeOTP.resendCooldownUntil.getTime() - now.getTime()) / 1000);
      throw new ApiError(429, `Please wait ${waitSeconds} second(s) before requesting a new OTP.`);
    }

    // Invalidate any previous unconsumed OTPs for this identifier/purpose
    await OTPVerification.deleteMany({
      identifier: normalizedId,
      purpose,
      consumedAt: null
    });
  } else {
    // In-memory fallback check
    const activeOTP = IN_MEMORY_OTP_STORE.get(`${normalizedId}_${purpose}`);
    if (activeOTP && activeOTP.consumedAt === null && activeOTP.expiresAt > now) {
      if (activeOTP.resendCooldownUntil && activeOTP.resendCooldownUntil > now) {
        const waitSeconds = Math.ceil((activeOTP.resendCooldownUntil.getTime() - now.getTime()) / 1000);
        throw new ApiError(429, `Please wait ${waitSeconds} second(s) before requesting a new OTP.`);
      }
    }
  }

  // 4. Generate & hash OTP
  const otp = generateSecureOTP();
  const otpHash = await hashOTP(otp);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  const resendCooldownUntil = new Date(Date.now() + 60 * 1000); // 60 seconds

  // 5. Store in database
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    await OTPVerification.create({
      identifier: normalizedId,
      channel,
      purpose,
      otpHash,
      metadata: purpose === 'signup' ? { name: name.trim(), role: role.toLowerCase() } : undefined,
      expiresAt,
      resendCooldownUntil,
      attempts: 0,
      maxAttempts: 5,
      consumedAt: null
    });
  } else {
    IN_MEMORY_OTP_STORE.set(`${normalizedId}_${purpose}`, {
      identifier: normalizedId,
      channel,
      purpose,
      otpHash,
      metadata: purpose === 'signup' ? { name: name?.trim(), role: role?.toLowerCase() } : undefined,
      expiresAt,
      resendCooldownUntil,
      attempts: 0,
      maxAttempts: 5,
      consumedAt: null
    });
  }

  // 6. Deliver OTP via real provider
  try {
    if (channel === 'email') {
      await sendOTPEmail({ to: normalizedId, otp, purpose });
    } else {
      await sendOTPSMS({ phone: normalizedId, otp, purpose });
    }
  } catch (providerError) {
    // Clean up OTP on delivery failure to prevent un-delivered pending OTPs
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await OTPVerification.deleteMany({ identifier: normalizedId, purpose, consumedAt: null });
    } else {
      IN_MEMORY_OTP_STORE.delete(`${normalizedId}_${purpose}`);
    }
    throw ApiError.internal(`OTP delivery failed: ${providerError.message}`);
  }

  return {
    success: true,
    message: `Verification code sent to your ${channel === 'email' ? 'email' : 'mobile number'}`,
    channel,
    expiresInSeconds: 300,
    resendCooldownSeconds: 60
  };
};

/**
 * Verifies OTP and completes signup or login session creation
 */
export const verifyOTP = async ({ identifier, channel, purpose, otp }) => {
  if (!identifier || !channel || !purpose || !otp) {
    throw ApiError.badRequest('Identifier, channel, purpose, and OTP are required');
  }

  const normalizedId = normalizeIdentifier(identifier, channel);

  if (!/^\d{6}$/.test(otp.trim())) {
    throw ApiError.badRequest('OTP must be a 6-digit numeric code');
  }

  const cleanOtp = otp.trim();
  const now = new Date();

  let otpRecord = null;
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    otpRecord = await OTPVerification.findOne({
      identifier: normalizedId,
      channel,
      purpose,
      consumedAt: null
    }).sort({ createdAt: -1 });
  } else {
    otpRecord = IN_MEMORY_OTP_STORE.get(`${normalizedId}_${purpose}`);
    if (otpRecord && otpRecord.consumedAt !== null) {
      otpRecord = null;
    }
  }

  if (!otpRecord) {
    throw ApiError.badRequest('Invalid or expired OTP. Please request a new verification code.');
  }

  // Check expiration
  if (now > otpRecord.expiresAt) {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await OTPVerification.deleteOne({ _id: otpRecord._id });
    } else {
      IN_MEMORY_OTP_STORE.delete(`${normalizedId}_${purpose}`);
    }
    throw ApiError.badRequest('OTP has expired. Please request a new verification code.');
  }

  // Check attempt threshold
  if (otpRecord.attempts >= otpRecord.maxAttempts) {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await OTPVerification.deleteOne({ _id: otpRecord._id });
    } else {
      IN_MEMORY_OTP_STORE.delete(`${normalizedId}_${purpose}`);
    }
    throw new ApiError(429, 'Maximum verification attempts exceeded. This OTP has been invalidated. Please request a new code.');
  }

  // Verify hash
  const isMatch = await verifyOTPHash(cleanOtp, otpRecord.otpHash);
  if (!isMatch) {
    otpRecord.attempts += 1;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await otpRecord.save();
    }
    const remaining = otpRecord.maxAttempts - otpRecord.attempts;
    if (remaining <= 0) {
      if (mongoose.connection && mongoose.connection.readyState === 1) {
        await OTPVerification.deleteOne({ _id: otpRecord._id });
      } else {
        IN_MEMORY_OTP_STORE.delete(`${normalizedId}_${purpose}`);
      }
      throw new ApiError(429, 'Maximum verification attempts exceeded. This OTP has been invalidated. Please request a new code.');
    }
    throw ApiError.badRequest(`Incorrect verification code. ${remaining} attempt(s) remaining.`);
  }

  // Mark single-use OTP as consumed
  otpRecord.consumedAt = now;
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    await otpRecord.save();
  } else {
    IN_MEMORY_OTP_STORE.delete(`${normalizedId}_${purpose}`);
  }

  // 1. Complete SIGNUP
  if (purpose === 'signup') {
    const { name, role } = otpRecord.metadata || {};
    if (!name || !role) {
      throw ApiError.badRequest('Incomplete registration metadata. Please start registration again.');
    }

    const safeRole = role.toLowerCase() === 'worker' ? 'worker' : 'customer';

    let user = null;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const userPayload = {
        name,
        role: safeRole,
        isActive: true
      };
      if (channel === 'email') {
        userPayload.email = normalizedId;
      } else {
        userPayload.phone = normalizedId;
      }

      user = await User.create(userPayload);

      // Automatic Worker profile creation for worker role
      let workerProfile = null;
      if (safeRole === 'worker') {
        try {
          workerProfile = await Worker.create({
            userId: user._id,
            title: 'Gig Professional',
            hourlyRate: 25,
            isVerified: false
          });
        } catch (workerErr) {
          await User.findByIdAndDelete(user._id);
          throw ApiError.internal('Failed to initialize worker profile. User registration rolled back.');
        }
      }

      const token = generateToken(user._id);
      return {
        success: true,
        message: 'Account created and verified successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isActive: user.isActive
        },
        token,
        workerProfile: workerProfile || undefined
      };
    } else {
      // In-memory fallback for offline test
      const userId = 'u_' + Date.now();
      user = {
        _id: userId,
        name,
        email: channel === 'email' ? normalizedId : '',
        phone: channel === 'sms' ? normalizedId : '',
        role: safeRole,
        isActive: true
      };
      MOCK_USERS_STORE.set(channel === 'email' ? normalizedId : user.phone, user);

      let workerProfile = null;
      if (safeRole === 'worker') {
        workerProfile = {
          _id: 'w_' + Date.now(),
          userId,
          title: 'Gig Professional',
          hourlyRate: 25,
          isVerified: false
        };
        MOCK_WORKERS_STORE.set(userId, workerProfile);
      }

      const token = generateToken(userId);
      return {
        success: true,
        message: 'Account created and verified successfully',
        user,
        token,
        workerProfile: workerProfile || undefined
      };
    }
  }

  // 2. Complete LOGIN
  if (purpose === 'login') {
    let user = null;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      user = await User.findOne(
        channel === 'email' ? { email: normalizedId } : { phone: normalizedId }
      );
    } else {
      for (const u of MOCK_USERS_STORE.values()) {
        if ((channel === 'email' && u.email === normalizedId) || (channel === 'sms' && u.phone === normalizedId)) {
          user = u;
          break;
        }
      }
    }

    if (!user) {
      throw ApiError.notFound('Account not found');
    }

    if (user.isActive === false) {
      throw ApiError.unauthorized('Account is deactivated. Please contact support.');
    }

    const token = generateToken(user._id);
    return {
      success: true,
      message: 'Logged in successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive
      },
      token
    };
  }
};
