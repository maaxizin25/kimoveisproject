import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { iListCategorieAndReal } from "../../interfaces/categorie.interfaces";

export const listCategorieAndRealEstateService = async (
  id: number
): Promise<iListCategorieAndReal> => {
  const catRepo = AppDataSource.getRepository(Category);

  const listEstate = await catRepo
    .createQueryBuilder("category")
    .innerJoinAndSelect("category.realEstate", "catReal")
    .where("category.id = :id", { id: id })
    .getOne();

  if (!listEstate) {
    throw new AppError("Category not found", 404);
  }

  return listEstate;
};
