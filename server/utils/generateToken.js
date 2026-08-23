import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'gigmatch_secret', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

export default generateToken;
