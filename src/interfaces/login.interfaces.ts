import { z } from "zod";
import { loginSchema } from "../schemas/login.schemas";

export type iLogin = z.infer<typeof loginSchema>;
