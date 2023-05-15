import { z } from "zod";
import {
  returnRealEstateSchema,
  returnRealEstateWhitoutAddress,
} from "./realEstate.schemas";

export const createCategorieSchema = z.object({
  name: z.string(),
});

export const returnCategorieSchema = createCategorieSchema.extend({
  id: z.number(),
});

export const listAllCategoriesSchema = z.array(returnCategorieSchema);

export const listCategorieAndRealEstate = returnCategorieSchema.extend({
  realEstate: z.array(returnRealEstateWhitoutAddress),
});
