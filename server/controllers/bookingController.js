import { Booking } from '../models/Booking.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createBooking = async (req, res, next) => {
    try {
        const { workerId, categoryId, serviceDetails, address, scheduledDate } = req.body;
        
        const worker = await User.findOne({ _id: workerId, role: 'worker', isActive: true });
        if (!worker || !worker.workerProfile.isAvailable) {
            throw new ApiError(400, 'Worker is not available');
        }

        const estimatedCost = worker.workerProfile.ratePerVisit;
        const platformFee = estimatedCost * 0.1;
        const workerPayout = estimatedCost - platformFee;

        const booking = await Booking.create({
            customerId: req.user._id,
            workerId,
            categoryId,
            serviceDetails,
            address,
            scheduledDate,
            estimatedCost,
            platformFee,
            workerPayout,
            statusHistory: [{ status: 'pending', notes: 'Booking created' }]
        });

        res.status(201).json(new ApiResponse(201, booking, 'Booking created successfully'));
    } catch (error) {
        next(error);
    }
};

export const getMyBookings = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        let query = {};
        
        if (req.user.role === 'customer') {
            query.customerId = req.user._id;
        } else if (req.user.role === 'worker') {
            query.workerId = req.user._id;
        } else {
            throw new ApiError(403, 'Invalid role');
        }

        if (status) query.status = status;

        const skip = (Number(page) - 1) * Number(limit);
        
        const bookings = await Booking.find(query)
            .sort('-createdAt')
            .skip(skip)
            .limit(Number(limit))
            .populate('customerId', 'name phone')
            .populate('workerId', 'name phone')
            .populate('categoryId', 'name');
            
        res.status(200).json(new ApiResponse(200, bookings, 'Bookings fetched'));
    } catch (error) {
        next(error);
    }
};

export const getBookingById = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('customerId', 'name phone')
            .populate('workerId', 'name phone')
            .populate('categoryId', 'name');
            
        if (!booking) throw new ApiError(404, 'Booking not found');
        
        if (req.user.role !== 'admin' && 
            booking.customerId._id.toString() !== req.user._id.toString() && 
            booking.workerId._id.toString() !== req.user._id.toString()) {
            throw new ApiError(403, 'Not authorized to view this booking');
        }

        res.status(200).json(new ApiResponse(200, booking, 'Booking fetched'));
    } catch (error) {
        next(error);
    }
};

export const updateBookingStatus = async (req, res, next) => {
    try {
        const { status, notes } = req.body;
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) throw new ApiError(404, 'Booking not found');
        
        booking.status = status;
        booking.statusHistory.push({ status, notes: notes || 'Status updated', createdBy: req.user._id });
        
        await booking.save();
        res.status(200).json(new ApiResponse(200, booking, 'Booking status updated'));
    } catch (error) {
        next(error);
    }
};

export const cancelBooking = async (req, res, next) => {
    try {
        const { reason } = req.body;
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) throw new ApiError(404, 'Booking not found');

        booking.status = 'cancelled';
        booking.cancelledBy = req.user._id;
        booking.cancellationReason = reason || 'Cancelled by user';
        booking.statusHistory.push({ status: 'cancelled', notes: reason, createdBy: req.user._id });
        
        await booking.save();
        res.status(200).json(new ApiResponse(200, booking, 'Booking cancelled'));
    } catch (error) {
        next(error);
    }
};
