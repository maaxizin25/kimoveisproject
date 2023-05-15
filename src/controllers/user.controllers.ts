import { Request, Response } from "express";
import { AppError } from "../errors";
import { createUserService } from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listAllUserService } from "../services/users/listAllUser.service";
import { updateUserService } from "../services/users/updateUser.service";

export const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const returnCreateUser = await createUserService(request.body);

  return response.status(201).json(returnCreateUser);
};

export const listAllUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const returnListUser = await listAllUserService(request.dataUser.admin);

  return response.json(returnListUser);
};

export const updateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id: number = Number(request.params.id);

  if (!request.dataUser.admin) {
    if (id !== request.dataUser.id) {
      throw new AppError("Insufficient permission", 403);
    }
  }

  const returnUpdateUser = await updateUserService(request.body, id);

  return response.json(returnUpdateUser);
};

export const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  if (!request.dataUser.admin) {
    throw new AppError("Insufficient permission", 403);
  }
  await deleteUserService(Number(request.params.id));

  return response.status(204).json();
};
