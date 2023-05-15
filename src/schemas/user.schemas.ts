import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().optional().default(false),
});

export const userSchemWhitoutPass = createUserSchema.omit({
  password: true,
});

export const userSchemaReturn = userSchemWhitoutPass.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

export const listAllUserSchema = z.array(userSchemaReturn);

export const updateUserSchema = createUserSchema.deepPartial().omit({
  admin: true,
});
