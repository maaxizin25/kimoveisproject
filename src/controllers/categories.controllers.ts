import { Response, Request } from "express";
import { AppError } from "../errors";
import { createCategorieService } from "../services/categories/createCategorie.service";
import { listAllCategoriesService } from "../services/categories/listAllCategories.service";
import { listCategorieAndRealEstateService } from "../services/categories/listCategorieEstate.service";

export const createCategorieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  if (!request.dataUser.admin) {
    throw new AppError("Insufficient permission", 403);
  }
  const createCategory = await createCategorieService(request.body);

  return response.status(201).json(createCategory);
};

export const listAllCategoriesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const listCategories = await listAllCategoriesService();

  return response.json(listCategories);
};

export const listCategorieAndRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const listCategorie = await listCategorieAndRealEstateService(
    Number(request.params.id)
  );

  return response.json(listCategorie);
};
