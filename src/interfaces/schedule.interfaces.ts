import { z } from "zod";
import { returnRealEstateFull } from "../schemas/realEstate.schemas";
import { CreatescheduleSchema } from "../schemas/schedule.schemas";

export type iCreateSchedule = z.infer<typeof CreatescheduleSchema>;
export type iListScheduleAndReal = z.infer<typeof returnRealEstateFull>;
