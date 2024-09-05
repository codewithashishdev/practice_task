const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");
const { registrationValidation, loginValidation } = require('../validation/validation');
const { verifyJWTToken } = require('../middleware/middleware');

router.post("/login", loginValidation, authController.login);

router.post("/registration", registrationValidation, authController.registration);

module.exports = router;