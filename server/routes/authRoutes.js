import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { handleSendOTP, handleVerifyOTP } from '../controllers/otpController.js';
import { handleGoogleAuth } from '../controllers/googleAuthController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter, otpSendLimiter, otpVerifyLimiter } from '../middleware/rateLimiter.js';
import { registerRules, loginRules, googleAuthRules } from '../validators/authValidator.js';
import { sendOTPRules, verifyOTPRules } from '../validators/otpValidator.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Google OAuth Authentication Endpoint
router.post('/google', authLimiter, validate(googleAuthRules), handleGoogleAuth);

// Passwordless OTP Authentication Endpoints
router.post('/otp/send', otpSendLimiter, validate(sendOTPRules), handleSendOTP);
router.post('/otp/verify', otpVerifyLimiter, validate(verifyOTPRules), handleVerifyOTP);

// Legacy / Existing Password Authentication Endpoints
router.post('/register', authLimiter, validate(registerRules), register);
router.post('/login', authLimiter, validate(loginRules), login);
router.get('/me', protect, getMe);

export default router;
