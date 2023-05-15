import { z } from "zod";
import {
  createRealEstateSchema,
  returnManyRealEstateSchema,
  returnRealEstateSchema,
} from "../schemas/realEstate.schemas";

export type iRealEstateCreate = z.infer<typeof createRealEstateSchema>;
export type iReturnRealEstate = z.infer<typeof returnRealEstateSchema>;
export type iReturnManyRealEstate = z.infer<typeof returnManyRealEstateSchema>;
