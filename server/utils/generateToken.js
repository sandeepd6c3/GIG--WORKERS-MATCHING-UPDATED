import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('FATAL: JWT_SECRET environment variable is missing or shorter than 32 characters.');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

export default generateToken;
