import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import {
  iCreateCategorie,
  iReturnCategorie,
} from "../../interfaces/categorie.interfaces";

export const createCategorieService = async (
  data: iCreateCategorie
): Promise<iReturnCategorie> => {
  const cateRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const findUser = await cateRepo.findOneBy({
    name: data.name,
  });
  if (findUser) {
    throw new AppError("Category already exists", 409);
  }

  const cateCreate = cateRepo.create(data);

  await cateRepo.save(cateCreate);

  return cateCreate;
};
