import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async ({ name, email, password, role }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }
  const user = await User.create({ name, email, password, role });
  return {
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user._id)
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.matchPassword(password))) {
    return {
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id)
    };
  }
  throw new Error('Invalid email or password');
};
