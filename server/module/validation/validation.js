const { body } = require('express-validator');

const registrationValidation = [
    body('firstName').isLength({ min: 3, max: 20 }).withMessage('firstName must be between 3 and 20 characters'),

    body('lastName').isLength({ min: 3, max: 20 }).withMessage('lastName must be between 3 and 20 characters'),

    body('email').isEmail().withMessage('Invalid email address'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    // body('role').withMessage('role must be at least'),
];

const loginValidation = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

module.exports = { registrationValidation, loginValidation };
