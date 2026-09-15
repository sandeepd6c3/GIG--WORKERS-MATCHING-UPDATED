import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { findUserById } from '../services/authService.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
        return res.status(500).json({ message: 'Server configuration error: invalid JWT secret' });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await findUserById(decoded.id);
      if (!req.user) {
        return res.status(401).json({ message: 'User not found with this token' });
      }
      if (req.user.isActive === false) {
        return res.status(401).json({ message: 'Account is deactivated. Please contact support.' });
      }
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role '${req.user?.role || 'anonymous'}' is not authorized to access this route`
      });
    }
    next();
  };
};
