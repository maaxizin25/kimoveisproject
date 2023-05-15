import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listAllUserController,
  updateUserController,
} from "../controllers/user.controllers";
import { validateSchemaMiddleware } from "../middlewares/validatedSchema.middleware";
import { verifyExistsEmailMiddleware } from "../middlewares/verifyEmailExists.middleware";
import { verifyIdUserExists } from "../middlewares/verifyIdUserExists.middleware";
import { verifyTokenIsValid } from "../middlewares/verifyTokenIsValid.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateSchemaMiddleware(createUserSchema),
  verifyExistsEmailMiddleware,
  createUserController
);
userRoutes.get("", verifyTokenIsValid, listAllUserController);
userRoutes.patch(
  "/:id",
  verifyTokenIsValid,
  verifyIdUserExists,
  validateSchemaMiddleware(updateUserSchema),
  updateUserController
);
userRoutes.delete(
  "/:id",
  verifyTokenIsValid,
  verifyIdUserExists,
  deleteUserController
);
