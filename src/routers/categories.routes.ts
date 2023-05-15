import { Router } from "express";
import {
  createCategorieController,
  listAllCategoriesController,
  listCategorieAndRealEstateController,
} from "../controllers/categories.controllers";
import { validateSchemaMiddleware } from "../middlewares/validatedSchema.middleware";
import { verifyTokenIsValid } from "../middlewares/verifyTokenIsValid.middleware";
import { createCategorieSchema } from "../schemas/categories.schemas";

export const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  verifyTokenIsValid,
  validateSchemaMiddleware(createCategorieSchema),
  createCategorieController
);

categoriesRoutes.get("", listAllCategoriesController);
categoriesRoutes.get("/:id/realEstate", listCategorieAndRealEstateController);
