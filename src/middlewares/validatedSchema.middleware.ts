import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validateSchemaMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const validBody = schema.parse(request.body);

    request.body = validBody;
    next();
  };
