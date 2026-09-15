import { body } from 'express-validator';

export const sendOTPRules = [
  body('identifier')
    .trim()
    .notEmpty().withMessage('Identifier (email or mobile number) is required'),
  body('channel')
    .trim()
    .notEmpty().withMessage('Channel is required')
    .isIn(['email', 'sms']).withMessage("Channel must be 'email' or 'sms'"),
  body('purpose')
    .trim()
    .notEmpty().withMessage('Purpose is required')
    .isIn(['signup', 'login']).withMessage("Purpose must be 'signup' or 'login'"),
  body('role')
    .optional()
    .custom((val, { req }) => {
      if (req.body.purpose === 'signup') {
        if (val === 'admin') {
          throw new Error('Admin registration is strictly forbidden');
        }
        if (!['customer', 'worker'].includes(val)) {
          throw new Error("Role must be 'customer' or 'worker'");
        }
      }
      return true;
    }),
  body('name')
    .optional()
    .custom((val, { req }) => {
      if (req.body.purpose === 'signup' && (!val || val.trim().length < 2)) {
        throw new Error('Name must be between 2 and 50 characters');
      }
      return true;
    })
];

export const verifyOTPRules = [
  body('identifier')
    .trim()
    .notEmpty().withMessage('Identifier is required'),
  body('channel')
    .trim()
    .notEmpty().withMessage('Channel is required')
    .isIn(['email', 'sms']).withMessage("Channel must be 'email' or 'sms'"),
  body('purpose')
    .trim()
    .notEmpty().withMessage('Purpose is required')
    .isIn(['signup', 'login']).withMessage("Purpose must be 'signup' or 'login'"),
  body('otp')
    .trim()
    .notEmpty().withMessage('OTP is required')
    .matches(/^\d{6}$/).withMessage('OTP must be a 6-digit number')
];
