import Notification from '../models/Notification.js';

export const createNotification = async ({ userId, title, message }) => {
  return await Notification.create({ userId, title, message });
};
