import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

import constant from "../../config/constant";

import { sendResponse } from "../../config/common";
import Language from "../../language/en.json";

export const SECRET_KEY: Secret = constant.SECRETE;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const verifyJWTToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: any = req?.header("Authorization");
  // let token  = req.session.token
  if (!token) {
    return sendResponse(
      res,
      403,
      true,
      Language.general.missing_jwt_token,
      null
    );
  }
  token = req?.header("Authorization")?.split(" ")[1];
  if (!token) {
    return sendResponse(
      res,
      403,
      true,
      Language.general.missing_jwt_token,
      null
    );
  }

  const varify = jwt.verify(token, SECRET_KEY);
  if (!varify) {
    return sendResponse(res, 403, false, Language.general.failed, null);
  }
  (req as CustomRequest).token = varify;
  next();
};