import mongoose from 'mongoose';
import User from '../models/User.js';

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;
    
    if (req.body.password || req.body.role) {
      // Role escalation prevention
      delete req.body.password;
      delete req.body.role;
    }

    let user = req.user;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { name, phone, avatar } },
        { new: true, runValidators: true }
      ).select('-password');
    } else {
      user = { ...req.user, name: name || req.user.name, phone: phone || req.user.phone, avatar: avatar || req.user.avatar };
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
