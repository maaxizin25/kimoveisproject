import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { iListAllUsers } from "../../interfaces/user.interfaces";
import { listAllUserSchema } from "../../schemas/user.schemas";

export const listAllUserService = async (
  admin: boolean
): Promise<iListAllUsers> => {
  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const userList = await userRepo.find();

  const userListReturn = listAllUserSchema.parse(userList);

  return userListReturn;
};
