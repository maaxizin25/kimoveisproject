import { Router } from "express";
import { loginController } from "../controllers/login.controllers";
import { validateSchemaMiddleware } from "../middlewares/validatedSchema.middleware";
import { loginSchema } from "../schemas/login.schemas";

export const loginRoutes: Router = Router();

loginRoutes.post("", validateSchemaMiddleware(loginSchema), loginController);
