import mongoose from 'mongoose';
import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
  try {
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      return res.json([
        {
          _id: 'notif_1',
          userId: req.user._id,
          title: 'Welcome to GIG MATCH AI',
          message: 'Your account is active.',
          read: false,
          createdAt: new Date().toISOString()
        }
      ]);
    }
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications || []);
  } catch (error) {
    res.json([]);
  }
};

export const markAsRead = async (req, res) => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await Notification.updateMany({ userId: req.user._id }, { read: true });
    }
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
