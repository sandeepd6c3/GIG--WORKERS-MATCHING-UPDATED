import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Worker from '../models/Worker.js';
import ApiError from '../utils/ApiError.js';
import generateToken from '../utils/generateToken.js';
import { MOCK_USERS_STORE, MOCK_WORKERS_STORE } from './authService.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '708167749653-tvo9mjk7ie1ak6uabqls3631h5gnvrrm.apps.googleusercontent.com';
const oauth2Client = new OAuth2Client(GOOGLE_CLIENT_ID);

/**
 * Cryptographically verifies Google ID Token using Google's public key infrastructure
 * @param {string} credential - Raw Google ID token (JWT)
 * @returns {Promise<Object>} Verified token payload
 */
export const verifyGoogleCredential = async (credential) => {
  if (!credential || typeof credential !== 'string') {
    throw ApiError.badRequest('Google credential (ID token) is required');
  }

  // Support for isolated test harness tokens when NODE_ENV === 'test'
  if (process.env.NODE_ENV === 'test' && credential.startsWith('test_google_token_')) {
    const rawId = credential.replace('test_google_token_', '');
    const email = rawId.includes('@') ? rawId : `${rawId}@test.com`;
    return {
      sub: `google_sub_${rawId.replace(/[^a-zA-Z0-9]/g, '_')}`,
      email,
      email_verified: true,
      name: `Google ${rawId.split('@')[0]}`,
      picture: `https://lh3.googleusercontent.com/test/${rawId.split('@')[0]}.jpg`,
      aud: GOOGLE_CLIENT_ID,
      iss: 'https://accounts.google.com'
    };
  }

  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.sub || !payload.email) {
      throw ApiError.badRequest('Invalid Google ID token claims: Missing sub or email');
    }

    return payload;
  } catch (error) {
    if (error.statusCode) throw error;
    throw ApiError.badRequest(`Google ID token verification failed: ${error.message}`);
  }
};

/**
 * Authenticates an existing user or initiates signup for a new user with Google
 * @param {Object} params
 * @param {string} params.credential - Google ID token
 * @param {'customer'|'worker'} [params.role] - Selected role for new user onboarding
 * @returns {Promise<Object>} Auth result with JWT token and user info
 */
export const authenticateWithGoogle = async ({ credential, role }) => {
  const payload = await verifyGoogleCredential(credential);

  const googleId = payload.sub;
  const email = payload.email.toLowerCase().trim();
  const emailVerified = payload.email_verified === true;
  const name = payload.name?.trim() || email.split('@')[0];
  const avatar = payload.picture || '';

  const isDbConnected = mongoose.connection && mongoose.connection.readyState === 1;

  // 1. Search for existing user by googleId or verified email
  let existingUser = null;
  if (isDbConnected) {
    existingUser = await User.findOne({ googleId });
    if (!existingUser) {
      existingUser = await User.findOne({ email });
    }
  } else {
    for (const u of MOCK_USERS_STORE.values()) {
      if (u.googleId === googleId || u.email === email) {
        existingUser = u;
        break;
      }
    }
  }

  // 2. EXISTING USER FLOW
  if (existingUser) {
    if (existingUser.isActive === false) {
      throw ApiError.unauthorized('Account is deactivated. Please contact support.');
    }

    // Safe Account Linking: Link googleId if not yet associated and Google email is verified
    if (!existingUser.googleId) {
      if (!emailVerified) {
        throw ApiError.badRequest('Google email must be verified to link with an existing account.');
      }
      existingUser.googleId = googleId;
      if (!existingUser.avatar && avatar) {
        existingUser.avatar = avatar;
      }

      if (isDbConnected) {
        await existingUser.save();
      } else {
        MOCK_USERS_STORE.set(existingUser.email, existingUser);
      }
    }

    const token = generateToken(existingUser._id);
    return {
      success: true,
      message: 'Logged in successfully with Google',
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone || '',
        role: existingUser.role,
        avatar: existingUser.avatar || avatar,
        isActive: existingUser.isActive
      },
      token
    };
  }

  // 3. NEW GOOGLE USER FLOW: Role selection required
  if (!role) {
    return {
      success: false,
      requiresRoleSelection: true,
      message: 'Account not found. Please choose whether you want to hire workers or offer services.',
      googleProfile: {
        name,
        email,
        picture: avatar
      }
    };
  }

  // Validate chosen role
  const safeRole = role.toLowerCase().trim();
  if (safeRole === 'admin') {
    throw ApiError.badRequest('Admin registration is strictly forbidden. Public signup allows customer and worker only.');
  }

  if (!['customer', 'worker'].includes(safeRole)) {
    throw ApiError.badRequest("Invalid role. Role must be 'customer' or 'worker'");
  }

  // Create new user
  let newUser = null;
  let workerProfile = null;

  if (isDbConnected) {
    newUser = await User.create({
      name,
      email,
      googleId,
      role: safeRole,
      avatar,
      isActive: true
    });

    if (safeRole === 'worker') {
      try {
        workerProfile = await Worker.create({
          userId: newUser._id,
          title: 'Gig Professional',
          hourlyRate: 25,
          isVerified: false
        });
      } catch (workerErr) {
        await User.findByIdAndDelete(newUser._id);
        throw ApiError.internal('Failed to initialize worker profile. User creation rolled back.');
      }
    }
  } else {
    // Fallback store
    const userId = 'u_google_' + Date.now();
    newUser = {
      _id: userId,
      name,
      email,
      googleId,
      role: safeRole,
      avatar,
      isActive: true
    };
    MOCK_USERS_STORE.set(email, newUser);

    if (safeRole === 'worker') {
      workerProfile = {
        _id: 'w_google_' + Date.now(),
        userId,
        title: 'Gig Professional',
        hourlyRate: 25,
        isVerified: false
      };
      MOCK_WORKERS_STORE.set(userId, workerProfile);
    }
  }

  const token = generateToken(newUser._id);

  return {
    success: true,
    message: 'Account created and authenticated successfully with Google',
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
      isActive: newUser.isActive
    },
    token,
    workerProfile: workerProfile || undefined
  };
};
