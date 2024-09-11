// const { general } = require("../language/en.json")

import Language from "../language/en.json";
import { Response } from "express";

interface resObj {
  status: boolean;
  status_code: number;
  message: string;
  data: any;
}

export const sendResponse = async (
  res: Response,
  statusCode: number,
  status: boolean,
  message: string,
  data: any = null
) => {
  const resObj: resObj = {
    status: status,
    status_code: statusCode,
    message: message,
    data: data,
  };

  return res.status(200).send(resObj);
};

export const serverErrorResponse = async (res: Response, data:any = {}) => {
  console.log(data);
  return res.status(500).send({
    status: false,
    status_code: 500,
    message: Language.general.server_error,
    errors: data,
  });
};

// module.exports = {
//   sendResponse,
//   serverErrorResponse,
// };
