import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRequest } from "../models/user.model";
import { User } from "@prisma/client";
dotenv.config();

export const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; //Get Bearer token

  if (!token) {
    return res.status(401).json({
      errors: 'Unauthorized'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" })
    }
    req.user = user as User;
    console.log("Authenticated User: ", req.user);
    next();
  });
}