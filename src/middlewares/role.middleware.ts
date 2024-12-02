import { NextFunction, Response } from "express";
import { UserRequest } from "../models/user.model";
import { ResponseError } from "../errors/error.response";

export const checkRole = (req: UserRequest, res: Response, next: NextFunction) => {
  if (req.user!.role === 'user') {
    throw new ResponseError(401, 'Unauthorized');
  }

  next();
}