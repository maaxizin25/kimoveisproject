import { Request, Response } from "express";
import { AppError } from "../errors";
import { createScheduleService } from "../services/schedule/createSchedule.service";
import { listAllScheduleAndRealService } from "../services/schedule/listAllSchedule.service";

export const createSchedule = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await createScheduleService(request.body, request.dataUser.id);

  return response.status(201).json({ message: "Schedule created" });
};

export const listAllScheduleAndRealController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  if (!request.dataUser.admin) {
    throw new AppError("Insufficient permission", 403);
  }

  const listAllSchedules = await listAllScheduleAndRealService(
    Number(request.params.id)
  );

  return response.json(listAllSchedules);
};
