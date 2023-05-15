import { z } from "zod";
import {
  createAddressSchema,
  returnCreateAddressSchema,
} from "./address.schemas";
import { listScheduleWhitUser } from "./schedule.schemas";

const realEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().positive(),
  categoryId: z.number().optional(),
});

export const createRealEstateSchema = realEstateSchema.extend({
  address: createAddressSchema,
});

export const returnRealEstateSchema = realEstateSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  sold: z.boolean(),
  address: returnCreateAddressSchema,
});

export const returnManyRealEstateSchema = z.array(returnRealEstateSchema);

export const returnRealEstateWhitoutAddress = returnRealEstateSchema.omit({
  address: true,
  categoryId: true,
});

export const returnRealEstateFull = returnRealEstateSchema.extend({
  schedules: z.array(listScheduleWhitUser),
});
