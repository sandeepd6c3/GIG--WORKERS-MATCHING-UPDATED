import { body } from 'express-validator';

export const registerRules = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('phone')
        .matches(/^[6-9]\d{9}$/).withMessage('Invalid Indian phone number'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role')
        .optional()
        .isIn(['customer', 'worker']).withMessage('Invalid role')
];

export const loginRules = [
    body('email')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
];
