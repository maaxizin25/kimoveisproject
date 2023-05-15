import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  createUserSchema,
  listAllUserSchema,
  updateUserSchema,
  userSchemaReturn,
} from "../schemas/user.schemas";

export type iCreateUser = z.infer<typeof createUserSchema>;
export type iUser = z.infer<typeof userSchemaReturn>;
export type iListAllUsers = z.infer<typeof listAllUserSchema>;
