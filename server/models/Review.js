import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Booking',
      required: true,
      unique: true,
    },
    customerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    workerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      maxlength: 100,
    },
    comment: {
      type: String,
      maxlength: 1000,
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

reviewSchema.post('save', async function () {
  const Worker = mongoose.model('User');
  
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
      'workerProfile.averageRating': Math.round(stats[0].averageRating * 10) / 10,
      'workerProfile.totalReviews': stats[0].totalReviews
    });
  } else {
    await Worker.findByIdAndUpdate(this.workerId, {
      'workerProfile.averageRating': 0,
      'workerProfile.totalReviews': 0
    });
  }
});

reviewSchema.index({ workerId: 1, createdAt: -1 });
reviewSchema.index({ bookingId: 1 }, { unique: true });
reviewSchema.index({ customerId: 1 });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
