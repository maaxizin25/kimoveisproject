import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

export const verifyTokenIsValid = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  let token = request.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY!.toString(),
    (error, decoded: any) => {
      if (error) {
        throw new AppError(error.message, 401);
      }
      request.dataUser = {
        id: Number(decoded.sub),
        admin: decoded.admin,
      };

      next();
    }
  );
};
