import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

export const deleteUserService = async (id: number) => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const deleteUser = await userRepo.softRemove({
    id: id,
  });
};
