import { z } from "zod";

export const createAddressSchema = z.object({
  street: z.string(),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string(),
  state: z.string().max(2),
});

export const returnCreateAddressSchema = createAddressSchema.extend({
  id: z.number(),
});
