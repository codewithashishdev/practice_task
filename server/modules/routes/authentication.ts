import express, { Router } from "express";

const router: Router = express.Router();

import * as AuthController from "../controller/authController";

import {
  registrationValidation,
  loginValidation,
} from "../validation/validation";
import { verifyJWTToken } from "../middleware/middleware";

router.post("/login", loginValidation, AuthController.login);

router.post(
  "/registration",
  registrationValidation,
  AuthController.registration
);

export default router;
