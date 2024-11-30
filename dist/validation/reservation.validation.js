"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationValidation = void 0;
const zod_1 = require("zod");
class ReservationValidation {
}
exports.ReservationValidation = ReservationValidation;
ReservationValidation.CREATE = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    serviceId: zod_1.z.string().uuid(),
    reservationDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    reservationTime: zod_1.z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/),
    numberOfPeople: zod_1.z.number().positive().int().min(1)
});
ReservationValidation.UPDATE = zod_1.z.object({
    serviceId: zod_1.z.string().uuid(),
    reservationDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    reservationTime: zod_1.z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/).optional(),
    numberOfPeople: zod_1.z.number().positive().int().min(1).optional()
});
