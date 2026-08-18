import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit Indian phone number'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['customer', 'worker', 'admin'],
      default: 'customer',
    },
    avatar: {
      type: String,
      default: '',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    workerProfile: {
      categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
      },
      bio: {
        type: String,
        maxlength: [500, 'Bio cannot be more than 500 characters'],
      },
      skills: [String],
      yearsOfExperience: {
        type: Number,
        min: [0, 'Experience cannot be negative'],
      },
      ratePerVisit: {
        type: Number,
        min: [0, 'Rate cannot be negative'],
      },
      city: String,
      serviceArea: [String],
      isAvailable: {
        type: Boolean,
        default: true,
      },
      trustTier: {
        type: String,
        enum: ['none', 'bronze', 'silver', 'gold'],
        default: 'none',
      },
      verificationStatus: {
        type: String,
        enum: ['unverified', 'pending', 'verified', 'rejected'],
        default: 'unverified',
      },
      documents: [
        {
          type: { type: String },
          url: String,
          status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
          },
          uploadedAt: { type: Date, default: Date.now },
        },
      ],
      portfolio: [String],
      totalJobsDone: {
        type: Number,
        default: 0,
      },
      averageRating: {
        type: Number,
        default: 0,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
      earnings: {
        total: { type: Number, default: 0 },
        pending: { type: Number, default: 0 },
        withdrawn: { type: Number, default: 0 },
      },
    },
    savedWorkers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    refreshToken: String,
  },
  { timestamps: true }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ 'workerProfile.categoryId': 1, 'workerProfile.city': 1 });
userSchema.index({ 'workerProfile.averageRating': -1 });
userSchema.index({ 'workerProfile.isAvailable': 1 });

const User = mongoose.model('User', userSchema);
export default User;
