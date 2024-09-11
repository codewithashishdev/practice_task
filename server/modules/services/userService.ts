import constant from "../../config/constant";
import jwt, { Secret } from "jsonwebtoken";

import db from "../models/index";

export const userDetails = async (condition: any, attributes: any = "") => {
  const user = await db.tbl_user.findOne({
    where: condition,
    attributes: attributes,
    nest: true,
    raw: true,
  });
  if (!user) {
    return false;
  }
  return user;
};

export const userCreate = async (data: any) => {
  const user = await db.tbl_user.create(data);
  return user;
};

export const SECRET_KEY: Secret = constant.SECRETE;

export const UserWithToken = async (user: any) => {
  const token = await jwt.sign(
    {
      id: user.id,
      name: user.firstName,
      email: user.email,
    },
    SECRET_KEY,
    {
      expiresIn: constant.EXP,
    }
  );
  return token;
};
