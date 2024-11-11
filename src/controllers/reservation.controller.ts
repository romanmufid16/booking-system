import { NextFunction, Response } from "express";
import { UserRequest } from "../models/user.model";
import { ResponseError } from "../errors/error.response";
import { CreateReservationRequest } from "../models/reservation.model";
import { ReservationService } from "../services/reservation.service";

export class ReservationController {

  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      console.log("User in request:", req.user?.id);
      const userId = req.user?.id;

      if (!userId) {
        console.log("User ID tidak ditemukan!");
        throw new ResponseError(400,'User ID is required');
      }

      const request: CreateReservationRequest = req.body
      request.userId = userId;

      const result = await ReservationService.create(request);
      
      res.status(201).json({
        message: 'Reservasi berhasil dibuat',
        reservation: result
      });
    } catch (error) {
      next(error);
    }
  }
}