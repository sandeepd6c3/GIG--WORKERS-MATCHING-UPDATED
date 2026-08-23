import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
    customerName: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
