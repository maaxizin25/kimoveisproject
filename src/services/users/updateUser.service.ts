import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iCreateUser, iUser } from "../../interfaces/user.interfaces";
import { userSchemaReturn } from "../../schemas/user.schemas";

export const updateUserService = async (
  data: iCreateUser,
  id: number
): Promise<iUser> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const userToUpdate = await userRepo.findOneBy({ id: id });

  const newUser = userRepo.create({
    ...userToUpdate,
    ...data,
  });

  await userRepo.save(newUser);

  const returnNewUser = userSchemaReturn.parse(newUser);

  return returnNewUser;
};
