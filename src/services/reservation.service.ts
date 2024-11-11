import { prismaClient } from "../app/database";
import { ResponseError } from "../errors/error.response";
import { CreateReservationRequest, ReservationResponse, toReservationResponse } from "../models/reservation.model";
import { ReservationValidation } from "../validation/reservation.validation";
import { Validation } from "../validation/validation";

export class ReservationService {

  static async checkServiceCapacity(
    serviceId: string,
    numberOfPeople: number
  ): Promise<void> {
    const service = await prismaClient.service.findUnique({
      where: { id: serviceId }
    });

    if (!service) {
      throw new ResponseError(404, 'Service is not found');
    }

    if (service.capacity < numberOfPeople) {
      throw new ResponseError(400, 'Not enough capacity for this reservation');
    }
  }

  static async create(req: CreateReservationRequest): Promise<ReservationResponse> {
    const createRequest = Validation.validate(
      ReservationValidation.CREATE,
      req
    );

    const { userId, serviceId, reservationDate, reservationTime, numberOfPeople } = createRequest;
    await this.checkServiceCapacity(serviceId, numberOfPeople);
    const reservationDateTimeString = `${reservationDate}T${reservationTime}:00`; // Format: '2024-11-11T19:00:00'
    const reservationDateTime = new Date(reservationDateTimeString); // Mengubah string ke objek Date

    const reservation = await prismaClient.$transaction(async (tx) => {
      await tx.service.update({
        where: { id: serviceId },
        data: {
          capacity: {
            decrement: numberOfPeople
          }
        }
      });

      return await tx.reservation.create({
        data: {
          userId,
          serviceId,
          reservationDate: reservationDateTime,
          reservationTime: reservationDateTime,
          numberOfPeople,
          status: "pending"
        }
      });

    });

    return toReservationResponse(reservation)

  }
}