import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id });
  res.json(notifications);
};

export const markAsRead = async (req, res) => {
  await Notification.updateMany({ userId: req.user._id }, { read: true });
  res.json({ success: true });
};
