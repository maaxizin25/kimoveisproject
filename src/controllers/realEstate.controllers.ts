import { Request, Response } from "express";
import { AppError } from "../errors";
import { realEstateCreateService } from "../services/realEstate/createRealEstate.service";
import { listAllRealEstateService } from "../services/realEstate/listAllRealEstate.service";

export const CreaterealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  if (!request.dataUser.admin) {
    throw new AppError("Insufficient permission", 403);
  }

  const createEstate = await realEstateCreateService(request.body);

  return response.status(201).json(createEstate);
};

export const ListAllRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const returnListRealEstate = await listAllRealEstateService();

  return response.json(returnListRealEstate);
};
