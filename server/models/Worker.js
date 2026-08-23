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
      trim: true
    },
    skills: [String],
    bio: {
      type: String,
      default: ''
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    trustTier: {
      type: String,
      enum: ['Gold Tier', 'Silver Tier', 'Bronze Tier'],
      default: 'Silver Tier'
    },
    location: {
      type: String,
      default: 'Downtown'
    },
    averageRating: {
      type: Number,
      default: 4.8
    },
    completedJobs: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;
