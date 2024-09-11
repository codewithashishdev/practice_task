import { body } from 'express-validator';

export const registrationValidation = [
    body('firstName').isLength({ min: 3, max: 20 }).withMessage('firstName must be between 3 and 20 characters'),

    body('lastName').isLength({ min: 3, max: 20 }).withMessage('lastName must be between 3 and 20 characters'),

    body('email').isEmail().withMessage('Invalid email address'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('role')
        .notEmpty().withMessage('Role is required')
        .isIn(['customer', 'admin']).withMessage('Role must be either customer or admin')
];

export const loginValidation = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]