import mongoose from 'mongoose';
import Review from '../models/Review.js';
import Worker from '../models/Worker.js';

export const createReview = async (req, res) => {
  try {
    const { workerId, rating, comment, bookingId } = req.body;

    if (!workerId || rating === undefined) {
      return res.status(400).json({ message: 'workerId and rating are required' });
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    }

    let review = null;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      // Check for duplicate review on same booking if bookingId is provided
      if (bookingId) {
        const existing = await Review.findOne({ bookingId, customerId: req.user._id });
        if (existing) {
          return res.status(409).json({ message: 'You have already reviewed this booking' });
        }
      }

      review = await Review.create({
        customerId: req.user._id,
        customerName: req.user.name,
        workerId,
        rating: numRating,
        comment,
        bookingId
      });

      // Recalculate Worker Average Rating
      const workerReviews = await Review.find({ workerId });
      if (workerReviews.length > 0) {
        const avg = workerReviews.reduce((sum, r) => sum + r.rating, 0) / workerReviews.length;
        await Worker.findByIdAndUpdate(workerId, {
          averageRating: Math.round(avg * 10) / 10
        });
      }
    } else {
      review = {
        _id: 'rev_' + Date.now(),
        customerId: req.user._id,
        customerName: req.user.name,
        workerId,
        rating: numRating,
        comment,
        createdAt: new Date().toISOString()
      };
    }

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getWorkerReviews = async (req, res) => {
  try {
    let reviews = [];
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      reviews = await Review.find({ workerId: req.params.workerId }).sort({ createdAt: -1 }).maxTimeMS(2000);
    }
    res.json(reviews || []);
  } catch (error) {
    res.json([]);
  }
};
