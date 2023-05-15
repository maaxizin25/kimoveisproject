import { z } from "zod";
import { userSchemaReturn } from "./user.schemas";

export const CreatescheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export const listScheduleWhitUser = CreatescheduleSchema.omit({
  realEstateId: true,
}).extend({
  user: userSchemaReturn,
});
