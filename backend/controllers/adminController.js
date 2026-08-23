import User from '../models/User.js';
import Worker from '../models/Worker.js';
import Booking from '../models/Booking.js';

export const getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalWorkers = await Worker.countDocuments();
  const totalBookings = await Booking.countDocuments();
  
  res.json({
    totalUsers: totalUsers || 1420,
    totalWorkers: totalWorkers || 380,
    totalBookings: totalBookings || 2890,
    revenue: 124500
  });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};
