import { sendResponse, serverErrorResponse } from "../../config/common";
import Language from "../../language/en.json";
import * as userService from "../services/userService";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";


/**
 * Login API
 */

interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CustomRequest extends Request {
  token: any | JwtPayload;
}
export const login = async (req: Request, res: Response) => {
  // Validate the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, errors.array()[0].msg, null);
  }
  try {
    let { email, password }: LoginRequestBody = req.body;

    const condition = {
      email: email,
    };
    const attributes: string[] = [
      "id",
      "firstName",
      "password",
      "email",
      "role",
    ];

    let userDetails = await userService.userDetails(condition, attributes);
    if (!userDetails) {
      return sendResponse(res, 403, false, Language.general.userNotFound, null);
    }
    if (userDetails.role == "customer") {
      return sendResponse(res, 403, false, Language.general.notAllowed, null);
    }

    const passwordCompare = await bcrypt.compare(
      password,
      userDetails.password
    );
    if (!passwordCompare) {
      return sendResponse(res, 401, false, Language.general.incorrectPassword, null);
    }

    const userWithToken = await userService.UserWithToken(userDetails);
    userDetails = {
        username: userDetails.firstName,
        email: userDetails.email,
        token : userWithToken
    }
    // req = userWithToken;
    // (req as CustomRequest).token = userWithToken;

    return sendResponse(res, 200, true, Language.general.userLoginSuccess, userDetails);
  } catch (error) {
    if (error instanceof Error) {
      return serverErrorResponse(res, error.message);
    }
  }
};

/**
 * registration API
 */

interface registrationRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}
export const registration = async (req: Request, res: Response) => {
  // Validate the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, errors.array()[0].msg, null);
  }
  try {
    let {
      firstName,
      lastName,
      email,
      password,
      role,
    }: registrationRequestBody = req.body;
    let condition = { email: email };
    let attributes = ["id", "firstName", "lastName", "email"];
            // Check if the user already exists
            const exitsUser = await userService.userDetails(condition, attributes);
            if (exitsUser) {
                return sendResponse(res, 403, false, Language.general.already_exists, null);
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
            return sendResponse(res, 200, true, Language.general.signed_success, createUser.email);
  } catch (error) {
    if (error instanceof Error) {
      return serverErrorResponse(res, error.message);
    }
  }
};
