import { Service } from "@prisma/client";

export type ServiceResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
}

export type CreateServiceRequest = {
  name: string;
  description: string;
  price: number;
  capacity: number;
}

export type GetServiceRequest = {
  page?: number;
  limit?: number;
}

export type ListResponse = {
  services: ServiceResponse[];
  total: number;
  page: number;
  showing: number;
}

export function toServiceResponse(service: Service): ServiceResponse {
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    price: service.price,
    capacity: service.capacity
  }
}