import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { RegisterRequest, LoginRequest } from "../models/user.model";


export class UserController {

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterRequest = req.body as RegisterRequest;
      const result = await UserService.register(request);
      res.status(201).json({
        message: 'Registrasi Berhasil',
        user: result
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const result = await UserService.login(request);
      res.status(200).json(result);;
    } catch (error) {
      next(error);
    }
  }
}