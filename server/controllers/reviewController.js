import { Review } from '../models/Review.js';
import { Booking } from '../models/Booking.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createReview = async (req, res, next) => {
    try {
        const { bookingId, rating, comment } = req.body;
        
        const booking = await Booking.findById(bookingId);
        if (!booking || booking.status !== 'completed' || booking.customerId.toString() !== req.user._id.toString()) {
            throw new ApiError(400, 'Invalid booking for review');
        }

        const existing = await Review.findOne({ bookingId });
        if (existing) throw new ApiError(400, 'Review already exists for this booking');

        const review = await Review.create({
            bookingId,
            customerId: req.user._id,
            workerId: booking.workerId,
            rating,
            comment
        });

        const worker = await User.findById(booking.workerId);
        const newTotal = worker.workerProfile.totalReviews + 1;
        const newAvg = ((worker.workerProfile.averageRating * worker.workerProfile.totalReviews) + rating) / newTotal;
        
        worker.workerProfile.totalReviews = newTotal;
        worker.workerProfile.averageRating = newAvg;
        await worker.save();

        res.status(201).json(new ApiResponse(201, review, 'Review added successfully'));
    } catch (error) {
        next(error);
    }
};

export const getWorkerReviews = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        
        const reviews = await Review.find({ workerId: req.params.workerId, isVisible: true })
            .sort('-createdAt')
            .skip(skip)
            .limit(Number(limit))
            .populate('customerId', 'name avatar');
            
        res.status(200).json(new ApiResponse(200, reviews, 'Reviews fetched'));
    } catch (error) {
        next(error);
    }
};
