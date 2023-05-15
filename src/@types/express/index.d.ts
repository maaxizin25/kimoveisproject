import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      dataUser: {
        id: number;
        admin: boolean;
      };
    }
  }
}
