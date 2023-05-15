import { Router } from "express";
import {
  createSchedule,
  listAllScheduleAndRealController,
} from "../controllers/schedule.controllers";
import { validateSchemaMiddleware } from "../middlewares/validatedSchema.middleware";
import { verifyTokenIsValid } from "../middlewares/verifyTokenIsValid.middleware";
import { CreatescheduleSchema } from "../schemas/schedule.schemas";

export const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  verifyTokenIsValid,
  validateSchemaMiddleware(CreatescheduleSchema),
  createSchedule
);
schedulesRoutes.get(
  "/realEstate/:id",
  verifyTokenIsValid,
  listAllScheduleAndRealController
);
