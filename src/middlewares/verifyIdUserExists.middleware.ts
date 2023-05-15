import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

export const verifyIdUserExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const idUser: number = Number(request.params.id);

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const userExists = await userRepo.findOneBy({ id: idUser });

  if (!userExists) {
    throw new AppError("User not found", 404);
  }

  next();
};
