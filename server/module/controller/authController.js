const { sendResponse, serverErrorResponse } = require("../../config/common");
const { general } = require("../../language/en.json");
const userService = require("../services/userService");

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const path = require('path');

/**
 * Login API
 */
const login = async (req, res, next) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, false, errors.array()[0].msg, null);
    }
    try {
        let { email, password } = req.body;

        const condition = {
            email: email,
        }
        const attributes = ["id", "firstName", "password", "email","role"];

        let userDetails = await userService.userDetails(condition, attributes);
        if (!userDetails) {
            return sendResponse(res, 403, false, general.userNotFound, null);
        };
        if(userDetails.role =="customer"){
            return sendResponse(res, 403, false, general.notAllowed, null);
        }

        const passwordCompare = await bcrypt.compare(password, userDetails.password)
        if (!passwordCompare) {
            return sendResponse(res, 401, false, general.incorrectPassword, null);
        };

        const userWithToken = await userService.UserWithToken(userDetails);
        userDetails = {
            username: userDetails.firstName,
            email: userDetails.email,
            token : userWithToken
        }
        req.session.token = userWithToken;
        return sendResponse(res, 200, true, general.userLoginSuccess, userDetails);

    } catch (error) {
        return serverErrorResponse(res, error.message);
    }
};

/**
 * registration API
 */
const registration = async (req, res, next) => {

    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, false, errors.array()[0].msg, null);
    }
    try {
        let { firstName, lastName, email, password, role } = req.body;

        let condition = { email: email };
        let attributes = ['id', 'firstName', 'lastName', 'email'];

        // Check if the user already exists
        const exitsUser = await userService.userDetails(condition, attributes);
        if (exitsUser) {
            return sendResponse(res, 403, false, general.already_exists, null);
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);
        const userObj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            role: role
        };
        // Save the user with the hashed password
        const createUser = await userService.userCreate(userObj);
        return sendResponse(res, 200, true, general.signed_success, createUser.email);

    } catch (error) {
        return serverErrorResponse(res, error.message);
    };
};

module.exports = {
    login: login,
    registration: registration
};