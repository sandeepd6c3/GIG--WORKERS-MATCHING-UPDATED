import mongoose from 'mongoose';
import User from '../models/User.js';
import Worker from '../models/Worker.js';
import generateToken from '../utils/generateToken.js';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';

export const MOCK_USERS_STORE = new Map();
export const MOCK_WORKERS_STORE = new Map();

// Initialize in-memory default mock accounts
const seedDefaultAccounts = async () => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('password123', salt);
  
  MOCK_USERS_STORE.set('admin@gigmatch.com', {
    _id: 'u_admin',
    name: 'Admin User',
    email: 'admin@gigmatch.com',
    passwordHash: hash,
    role: 'admin',
    isActive: true
  });

  MOCK_USERS_STORE.set('customer@gigmatch.com', {
    _id: 'u_customer',
    name: 'John Customer',
    email: 'customer@gigmatch.com',
    phone: '9876543210',
    passwordHash: hash,
    role: 'customer',
    isActive: true
  });

  MOCK_USERS_STORE.set('worker@gigmatch.com', {
    _id: 'u_worker',
    name: 'Sarah Jenkins',
    email: 'worker@gigmatch.com',
    phone: '9876543211',
    passwordHash: hash,
    role: 'worker',
    isActive: true
  });

  MOCK_USERS_STORE.set('inactive@gigmatch.com', {
    _id: 'u_inactive',
    name: 'Inactive User',
    email: 'inactive@gigmatch.com',
    phone: '9876543299',
    passwordHash: hash,
    role: 'customer',
    isActive: false
  });
};

seedDefaultAccounts();

export const registerUser = async ({ name, email, password, phone, role = 'customer' }) => {
  if (!name || !email || !password) {
    throw ApiError.badRequest('Name, email, and password are required');
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Role validation & privilege escalation prevention
  if (role && role.toLowerCase() === 'admin') {
    throw ApiError.badRequest('Admin registration is not allowed. Only customer and worker registrations are permitted.');
  }

  if (role && !['customer', 'worker'].includes(role.toLowerCase())) {
    throw ApiError.badRequest('Invalid role. Role must be customer or worker.');
  }

  const safeRole = role && role.toLowerCase() === 'worker' ? 'worker' : 'customer';

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    throw ApiError.badRequest('Invalid email format');
  }

  // Strong password policy (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    throw ApiError.badRequest('Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  }

  // Phone validation if provided
  if (phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      throw ApiError.badRequest('Invalid phone number format. Must be a 10-digit number starting with 6-9');
    }
  }

  if (mongoose.connection && mongoose.connection.readyState === 1) {
    const filter = [{ email: normalizedEmail }];
    if (phone) filter.push({ phone });
    const userExists = await User.findOne({ $or: filter });
    if (userExists) {
      if (userExists.email === normalizedEmail) {
        throw new ApiError(409, 'User already exists with this email');
      }
      throw new ApiError(409, 'User already exists with this phone number');
    }

    const userData = {
      name,
      email: normalizedEmail,
      password,
      role: safeRole,
      isActive: true
    };
    if (phone) userData.phone = phone;

    let user;
    try {
      user = await User.create(userData);
    } catch (err) {
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0] || 'credential';
        throw new ApiError(409, `User already exists with this ${field}`);
      }
      throw err;
    }

    // Automatically create a linked Worker profile if role is worker
    let workerProfile = null;
    if (safeRole === 'worker') {
      try {
        workerProfile = await Worker.findOne({ userId: user._id });
        if (!workerProfile) {
          workerProfile = await Worker.create({
            userId: user._id,
            title: 'Gig Professional',
            hourlyRate: 25,
            isVerified: false
          });
        }
      } catch (workerErr) {
        // Rollback user creation to prevent orphaned accounts
        await User.findByIdAndDelete(user._id);
        throw ApiError.internal('Failed to initialize worker profile. User registration rolled back.');
      }
    }

    const response = {
      user: { _id: user._id, name: user.name, email: user.email, role: user.role, isActive: user.isActive },
      token: generateToken(user._id)
    };
    if (workerProfile) response.workerProfile = workerProfile;
    return response;
  } else {
    // In-memory fallback
    if (MOCK_USERS_STORE.has(normalizedEmail)) {
      throw new ApiError(409, 'User already exists with this email');
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = 'u_' + Date.now();
    const newUser = {
      _id: userId,
      name,
      email: normalizedEmail,
      phone: phone || '',
      passwordHash,
      role: safeRole,
      isActive: true
    };
    MOCK_USERS_STORE.set(normalizedEmail, newUser);

    let workerProfile = null;
    if (safeRole === 'worker') {
      workerProfile = {
        _id: 'w_' + Date.now(),
        userId,
        title: 'Gig Professional',
        hourlyRate: 25,
        isVerified: false
      };
      MOCK_WORKERS_STORE.set(userId, workerProfile);
    }

    const response = {
      user: { _id: userId, name, email: normalizedEmail, role: safeRole, isActive: true },
      token: generateToken(userId)
    };
    if (workerProfile) response.workerProfile = workerProfile;
    return response;
  }
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw ApiError.badRequest('Email and password are required');
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (mongoose.connection && mongoose.connection.readyState === 1) {
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    if (user.isActive === false) {
      throw ApiError.unauthorized('Account is deactivated. Please contact support.');
    }

    return {
      user: { _id: user._id, name: user.name, email: user.email, role: user.role, isActive: user.isActive },
      token: generateToken(user._id)
    };
  } else {
    // In-memory fallback
    const mockUser = MOCK_USERS_STORE.get(normalizedEmail);
    if (!mockUser || !(await bcrypt.compare(password, mockUser.passwordHash))) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    if (mockUser.isActive === false) {
      throw ApiError.unauthorized('Account is deactivated. Please contact support.');
    }

    return {
      user: { _id: mockUser._id, name: mockUser.name, email: mockUser.email, role: mockUser.role, isActive: mockUser.isActive },
      token: generateToken(mockUser._id)
    };
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

export const findWorkerByUserId = async (userId) => {
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    return await Worker.findOne({ userId });
  }
  return MOCK_WORKERS_STORE.get(userId) || null;
};

export const updateUserActiveStatus = async (id, isActive) => {
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    return await User.findByIdAndUpdate(id, { isActive }, { new: true });
  }
  for (const u of MOCK_USERS_STORE.values()) {
    if (u._id.toString() === id.toString()) {
      u.isActive = isActive;
      return u;
    }
  }
  return null;
};
