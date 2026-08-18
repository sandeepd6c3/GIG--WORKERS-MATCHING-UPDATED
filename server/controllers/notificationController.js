import { Notification } from '../models/Notification.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getMyNotifications = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        
        const notifications = await Notification.find({ userId: req.user._id })
            .sort('-createdAt')
            .skip(skip)
            .limit(Number(limit));
            
        res.status(200).json(new ApiResponse(200, notifications, 'Notifications fetched'));
    } catch (error) {
        next(error);
    }
};

export const markAsRead = async (req, res, next) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { isRead: true },
            { new: true }
        );
        res.status(200).json(new ApiResponse(200, notification, 'Notification marked as read'));
    } catch (error) {
        next(error);
    }
};

export const markAllAsRead = async (req, res, next) => {
    try {
        await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true });
        res.status(200).json(new ApiResponse(200, {}, 'All notifications marked as read'));
    } catch (error) {
        next(error);
    }
};

export const getUnreadCount = async (req, res, next) => {
    try {
        const count = await Notification.countDocuments({ userId: req.user._id, isRead: false });
        res.status(200).json(new ApiResponse(200, { count }, 'Unread count fetched'));
    } catch (error) {
        next(error);
    }
};
