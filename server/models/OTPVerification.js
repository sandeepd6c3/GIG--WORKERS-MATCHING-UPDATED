import mongoose from 'mongoose';

const otpVerificationSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      required: [true, 'Identifier is required'],
      trim: true,
      lowercase: true,
      index: true
    },
    channel: {
      type: String,
      required: [true, 'Channel is required'],
      enum: ['email', 'sms']
    },
    purpose: {
      type: String,
      required: [true, 'Purpose is required'],
      enum: ['signup', 'login']
    },
    otpHash: {
      type: String,
      required: [true, 'OTP hash is required']
    },
    metadata: {
      name: { type: String, trim: true },
      role: { type: String, enum: ['customer', 'worker'] }
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // TTL index in MongoDB
    },
    attempts: {
      type: Number,
      default: 0
    },
    maxAttempts: {
      type: Number,
      default: 5
    },
    resendCooldownUntil: {
      type: Date,
      default: () => new Date(Date.now() + 60 * 1000)
    },
    consumedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Compound index for fast active OTP lookups
otpVerificationSchema.index({ identifier: 1, purpose: 1, consumedAt: 1 });

const OTPVerification = mongoose.model('OTPVerification', otpVerificationSchema);

export default OTPVerification;
