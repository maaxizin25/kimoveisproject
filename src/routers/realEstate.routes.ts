import { Router } from "express";
import {
  CreaterealEstateController,
  ListAllRealEstateController,
} from "../controllers/realEstate.controllers";
import { validateSchemaMiddleware } from "../middlewares/validatedSchema.middleware";
import { verifyTokenIsValid } from "../middlewares/verifyTokenIsValid.middleware";
import { createRealEstateSchema } from "../schemas/realEstate.schemas";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  verifyTokenIsValid,
  validateSchemaMiddleware(createRealEstateSchema),
  CreaterealEstateController
);

realEstateRoutes.get("", ListAllRealEstateController);
