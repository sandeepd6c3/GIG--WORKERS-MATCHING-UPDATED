import { body } from 'express-validator';

export const registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[6-9]\d{9}$/).withMessage('Invalid phone number format. Must be a 10-digit number starting with 6-9'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/).withMessage('Password must contain at least one special character'),
  body('role')
    .optional()
    .custom((val) => {
      if (val === 'admin') {
        throw new Error('Admin registration is not allowed');
      }
      if (!['customer', 'worker'].includes(val)) {
        throw new Error('Role must be either customer or worker');
      }
      return true;
    })
];

export const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

export const googleAuthRules = [
  body('credential')
    .trim()
    .notEmpty().withMessage('Google credential token is required'),
  body('role')
    .optional()
    .custom((val) => {
      if (val === 'admin') {
        throw new Error('Admin registration is strictly forbidden');
      }
      if (!['customer', 'worker'].includes(val)) {
        throw new Error("Role must be 'customer' or 'worker'");
      }
      return true;
    })
];

