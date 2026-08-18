import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(new ApiResponse(200, user, 'Profile fetched'));
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const { name, phone, avatar } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, phone, avatar },
            { new: true, runValidators: true }
        ).select('-password');
        res.status(200).json(new ApiResponse(200, user, 'Profile updated'));
    } catch (error) {
        next(error);
    }
};

export const updatePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id).select('+password');
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) throw new ApiError(400, 'Invalid current password');
        
        user.password = newPassword;
        await user.save();
        
        res.status(200).json(new ApiResponse(200, {}, 'Password updated'));
    } catch (error) {
        next(error);
    }
};
