import { User } from '../models/User.js';
import { Booking } from '../models/Booking.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getDashboardStats = async (req, res, next) => {
    try {
        const totalCustomers = await User.countDocuments({ role: 'customer' });
        const totalWorkers = await User.countDocuments({ role: 'worker' });
        const pendingVerifications = await User.countDocuments({ role: 'worker', 'workerProfile.verificationStatus': 'pending' });
        const completedBookings = await Booking.countDocuments({ status: 'completed' });
        
        res.status(200).json(new ApiResponse(200, {
            totalCustomers,
            totalWorkers,
            pendingVerifications,
            completedBookings
        }, 'Dashboard stats fetched'));
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const { role, page = 1, limit = 20, search } = req.query;
        let query = {};
        if (role) query.role = role;
        if (search) query.name = { $regex: search, $options: 'i' };
        
        const skip = (Number(page) - 1) * Number(limit);
        const users = await User.find(query).skip(skip).limit(Number(limit)).select('-password');
        
        res.status(200).json(new ApiResponse(200, users, 'Users fetched'));
    } catch (error) {
        next(error);
    }
};

export const updateUserStatus = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true }).select('-password');
        res.status(200).json(new ApiResponse(200, user, 'User status updated'));
    } catch (error) {
        next(error);
    }
};

export const getVerificationQueue = async (req, res, next) => {
    try {
        const workers = await User.find({ role: 'worker', 'workerProfile.verificationStatus': 'pending' }).select('-password');
        res.status(200).json(new ApiResponse(200, workers, 'Verification queue fetched'));
    } catch (error) {
        next(error);
    }
};

export const processVerification = async (req, res, next) => {
    try {
        const { status } = req.body; // 'verified' or 'rejected'
        const worker = await User.findById(req.params.id);
        if (!worker || worker.role !== 'worker') throw new ApiError(404, 'Worker not found');
        
        worker.workerProfile.verificationStatus = status;
        if (status === 'verified') {
            worker.workerProfile.trustTier = 'bronze';
        }
        await worker.save();
        
        res.status(200).json(new ApiResponse(200, worker, 'Verification processed'));
    } catch (error) {
        next(error);
    }
};

export const getAllBookings = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        let query = {};
        if (status) query.status = status;
        
        const skip = (Number(page) - 1) * Number(limit);
        const bookings = await Booking.find(query).skip(skip).limit(Number(limit));
        
        res.status(200).json(new ApiResponse(200, bookings, 'All bookings fetched'));
    } catch (error) {
        next(error);
    }
};
