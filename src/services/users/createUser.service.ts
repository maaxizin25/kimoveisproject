import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iCreateUser, iUser } from "../../interfaces/user.interfaces";
import { userSchemaReturn } from "../../schemas/user.schemas";

export const createUserService = async (data: iCreateUser): Promise<iUser> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const userCreate = userRepo.create(data);

  await userRepo.save(userCreate);

  const userReturn = userSchemaReturn.parse(userCreate);

  return userReturn;
};
