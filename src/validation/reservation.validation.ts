import { z, ZodType } from "zod";

export class ReservationValidation {

  static readonly CREATE: ZodType = z.object({
    userId: z.string().uuid(),
    serviceId: z.string().uuid(),
    reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    reservationTime: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/),
    numberOfPeople: z.number().positive().int().min(1)
  });

  static readonly UPDATE: ZodType = z.object({
    serviceId: z.string().uuid(),
    reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    reservationTime: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/).optional(),
    numberOfPeople: z.number().positive().int().min(1).optional()
  });
}