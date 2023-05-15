import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

export const verifyExistsEmailMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = request.body.email;

  const userRepo = AppDataSource.getRepository(User);

  if (email) {
    const userExists = await userRepo.findOne({
      where: {
        email: email,
      },
    });

    if (userExists) {
      throw new AppError("Email already exists", 409);
    }
  }

  next();
};
