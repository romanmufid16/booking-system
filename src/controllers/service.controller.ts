import { NextFunction, Request, Response } from "express";
import { CreateServiceRequest, GetServiceRequest, UpdateServiceRequest } from "../models/service.model";
import { ServiceService } from "../services/service.service";
import { logger } from "../app/logging";

export class ServiceController {

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const request: GetServiceRequest = {
        page: parseInt(req.query.page as string, 10) || 1,
        limit: parseInt(req.query.limit as string, 10) || 10
      }

      const result = await ServiceService.list(request);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateServiceRequest = req.body;
      const result = await ServiceService.create(request);

      res.status(201).json({
        message: 'Service berhasil dibuat',
        service: result
      })
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateServiceRequest = req.body;
      request.id = req.params.id;

      const response = await ServiceService.update(request);
      logger.debug('response : ' + JSON.stringify(response));

      res.status(200).json({
        message: 'Service berhasil diupdate',
        service: response
      })
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceId = req.params.id;
      const response = await ServiceService.remove(serviceId);
      logger.debug("response : " + JSON.stringify(response));
      res.status(200).json({
        message: "Service berhasil dihapus"
      });
    } catch (error) {
      next(error);
    }
  }
}