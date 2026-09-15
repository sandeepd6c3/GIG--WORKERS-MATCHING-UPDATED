import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    categoryName: {
      type: String,
      default: 'General Trades'
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Gig Professional'
    },
    skills: [String],
    bio: {
      type: String,
      default: ''
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: 0,
      default: 25
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    trustTier: {
      type: String,
      enum: ['Gold Tier', 'Silver Tier', 'Bronze Tier'],
      default: 'Bronze Tier'
    },
    location: {
      type: String,
      default: 'Downtown'
    },
    averageRating: {
      type: Number,
      default: 0
    },
    completedJobs: {
      type: Number,
      default: 0
    },
    experienceYears: {
      type: Number,
      default: 1
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;
