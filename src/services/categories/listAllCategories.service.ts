import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { iListAllCategorie } from "../../interfaces/categorie.interfaces";

export const listAllCategoriesService =
  async (): Promise<iListAllCategorie> => {
    const catRepo: Repository<Category> = AppDataSource.getRepository(Category);

    const listCat = catRepo.find();

    return listCat;
  };
