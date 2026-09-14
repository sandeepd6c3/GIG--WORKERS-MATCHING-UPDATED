import mongoose from 'mongoose';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';

const MOCK_USERS_STORE = new Map();

// Initialize in-memory default mock accounts
const seedDefaultAccounts = async () => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('password123', salt);
  
  MOCK_USERS_STORE.set('admin@gigmatch.com', {
    _id: 'u_admin',
    name: 'Admin User',
    email: 'admin@gigmatch.com',
    passwordHash: hash,
    role: 'admin'
  });

  MOCK_USERS_STORE.set('customer@gigmatch.com', {
    _id: 'u_customer',
    name: 'John Customer',
    email: 'customer@gigmatch.com',
    passwordHash: hash,
    role: 'customer'
  });

  MOCK_USERS_STORE.set('worker@gigmatch.com', {
    _id: 'u_worker',
    name: 'Sarah Jenkins',
    email: 'worker@gigmatch.com',
    passwordHash: hash,
    role: 'worker'
  });
};

seedDefaultAccounts();

export const registerUser = async ({ name, email, password, role = 'customer' }) => {
  if (!name || !email || !password) {
    throw ApiError.badRequest('Name, email, and password are required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw ApiError.badRequest('Invalid email format');
  }

  if (password.length < 6) {
    throw ApiError.badRequest('Password must be at least 6 characters');
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (mongoose.connection && mongoose.connection.readyState === 1) {
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      throw new ApiError(409, 'User already exists with this email');
    }
    const user = await User.create({ name, email: normalizedEmail, password, role });
    return {
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id)
    };
  } else {
    // In-memory fallback
    if (MOCK_USERS_STORE.has(normalizedEmail)) {
      throw new ApiError(409, 'User already exists with this email');
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = 'u_' + Date.now();
    const newUser = { _id: userId, name, email: normalizedEmail, passwordHash, role };
    MOCK_USERS_STORE.set(normalizedEmail, newUser);

    return {
      user: { _id: userId, name, email: normalizedEmail, role },
      token: generateToken(userId)
    };
  }
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw ApiError.badRequest('Email and password are required');
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (mongoose.connection && mongoose.connection.readyState === 1) {
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (user && (await user.matchPassword(password))) {
      return {
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token: generateToken(user._id)
      };
    }
    throw ApiError.unauthorized('Invalid email or password');
  } else {
    // In-memory fallback
    const mockUser = MOCK_USERS_STORE.get(normalizedEmail);
    if (mockUser && (await bcrypt.compare(password, mockUser.passwordHash))) {
      return {
        user: { _id: mockUser._id, name: mockUser.name, email: mockUser.email, role: mockUser.role },
        token: generateToken(mockUser._id)
      };
    }
    throw ApiError.unauthorized('Invalid email or password');
  }
};

export const findUserById = async (id) => {
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    return await User.findById(id).select('-password');
  }
  for (const u of MOCK_USERS_STORE.values()) {
    if (u._id.toString() === id.toString()) {
      const { passwordHash, ...safeUser } = u;
      return safeUser;
    }
  }
  return null;
};
