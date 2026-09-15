import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import ApiError from './ApiError.js';

/**
 * Normalizes email or mobile number identifiers
 * @param {string} identifier
 * @param {'email'|'sms'} channel
 * @returns {string} normalized identifier
 */
export const normalizeIdentifier = (identifier, channel) => {
  if (!identifier || typeof identifier !== 'string') {
    throw ApiError.badRequest('Identifier must be a non-empty string');
  }

  const trimmed = identifier.trim();

  if (channel === 'email') {
    const emailNormalized = trimmed.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailNormalized)) {
      throw ApiError.badRequest('Invalid email address format');
    }
    return emailNormalized;
  }

  if (channel === 'sms') {
    // Strip common country code prefixes, spaces, dashes
    let cleaned = trimmed.replace(/[\s\-\(\)]/g, '');
    if (cleaned.startsWith('+91')) {
      cleaned = cleaned.substring(3);
    } else if (cleaned.startsWith('91') && cleaned.length === 12) {
      cleaned = cleaned.substring(2);
    } else if (cleaned.startsWith('0') && cleaned.length === 11) {
      cleaned = cleaned.substring(1);
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleaned)) {
      throw ApiError.badRequest('Invalid mobile number. Must be a valid 10-digit Indian phone number starting with 6-9');
    }
    return cleaned;
  }

  throw ApiError.badRequest("Channel must be either 'email' or 'sms'");
};

/**
 * Generates a cryptographically secure 6-digit numeric OTP string
 * @returns {string} 6-digit OTP
 */
export const generateSecureOTP = () => {
  // Generates integer in range [100000, 999999]
  const otpNumber = crypto.randomInt(100000, 1000000);
  return otpNumber.toString();
};

/**
 * Hashes an OTP with bcrypt
 * @param {string} otp
 * @returns {Promise<string>}
 */
export const hashOTP = async (otp) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(otp, salt);
};

/**
 * Compares plain OTP against stored hash
 * @param {string} otp
 * @param {string} otpHash
 * @returns {Promise<boolean>}
 */
export const verifyOTPHash = async (otp, otpHash) => {
  return await bcrypt.compare(otp, otpHash);
};
