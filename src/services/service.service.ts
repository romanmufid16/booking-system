import { prismaClient } from "../app/database";
import { CreateServiceRequest, GetServiceRequest, ListResponse, ServiceResponse, toServiceResponse } from "../models/service.model";
import { ServiceValidation } from "../validation/service.validation";
import { Validation } from "../validation/validation";

export class ServiceService {

  static async create(req: CreateServiceRequest): Promise<ServiceResponse> {
    const createRequest = Validation.validate(
      ServiceValidation.CREATE,
      req
    );

    const service = await prismaClient.service.create({
      data: createRequest
    });

    return toServiceResponse(service);
  }

  static async list(req: GetServiceRequest): Promise<ListResponse> {
    const getRequest = Validation.validate(
      ServiceValidation.GET,
      req
    );

    const page = getRequest.page!;
    const limit = getRequest.limit!;
    const offset = (page - 1) * limit;

    const totalServices = await prismaClient.service.count({
      where: {
        capacity: {
          gt: 0 // Memastikan kapasitas lebih besar dari 0
        }
      }
    });
    const services = await prismaClient.service.findMany({
      skip: offset,
      take: limit,
      where: {
        capacity: {
          gt: 0 // Memastikan kapasitas lebih besar dari 0
        }
      }
    });

    const serviceResponses: ServiceResponse[] = services.map(toServiceResponse);

    return {
      services: serviceResponses,
      total: totalServices,
      page,
      showing: limit
    };
  }
}