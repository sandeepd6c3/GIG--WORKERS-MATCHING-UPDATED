import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: [true, 'Review must be associated with a valid Booking ID'],
      unique: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a Customer'],
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: [true, 'Review must belong to a Worker'],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating between 1 and 5'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, 'Review title cannot exceed 100 characters'],
      default: '',
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [1000, 'Review comment cannot exceed 1000 characters'],
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    flagged: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Post-save middleware hook: Re-calculates and updates averageRating & totalReviews on Worker model
reviewSchema.post('save', async function () {
  const Worker = mongoose.model('Worker');

  const stats = await this.constructor.aggregate([
    {
      $match: { workerId: this.workerId, isVisible: true }
    },
    {
      $group: {
        _id: '$workerId',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await Worker.findByIdAndUpdate(this.workerId, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      totalReviews: stats[0].totalReviews
    });
  } else {
    await Worker.findByIdAndUpdate(this.workerId, {
      averageRating: 0,
      totalReviews: 0
    });
  }
});

reviewSchema.index({ workerId: 1, createdAt: -1 });
reviewSchema.index({ bookingId: 1 }, { unique: true });
reviewSchema.index({ customerId: 1 });

const Review = mongoose.model('Review', reviewSchema);
export default Review;

