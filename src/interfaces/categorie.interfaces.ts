import { z } from "zod";
import {
  createCategorieSchema,
  listAllCategoriesSchema,
  listCategorieAndRealEstate,
  returnCategorieSchema,
} from "../schemas/categories.schemas";

export type iCreateCategorie = z.infer<typeof createCategorieSchema>;
export type iReturnCategorie = z.infer<typeof returnCategorieSchema>;
export type iListAllCategorie = z.infer<typeof listAllCategoriesSchema>;
export type iListCategorieAndReal = z.infer<typeof listCategorieAndRealEstate>;
