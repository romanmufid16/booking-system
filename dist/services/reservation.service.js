"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const database_1 = require("../app/database");
const error_response_1 = require("../errors/error.response");
const reservation_model_1 = require("../models/reservation.model");
const reservation_validation_1 = require("../validation/reservation.validation");
const validation_1 = require("../validation/validation");
class ReservationService {
    static checkServiceCapacity(serviceId, numberOfPeople) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield database_1.prismaClient.service.findUnique({
                where: { id: serviceId }
            });
            if (!service) {
                throw new error_response_1.ResponseError(404, 'Service is not found');
            }
            if (service.capacity < numberOfPeople) {
                throw new error_response_1.ResponseError(400, 'Not enough capacity for this reservation');
            }
        });
    }
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(reservation_validation_1.ReservationValidation.CREATE, req);
            const { userId, serviceId, reservationDate, reservationTime, numberOfPeople } = createRequest;
            yield this.checkServiceCapacity(serviceId, numberOfPeople);
            const reservationDateTimeString = `${reservationDate}T${reservationTime}:00`; // Format: '2024-11-11T19:00:00'
            const reservationDateTime = new Date(reservationDateTimeString); // Mengubah string ke objek Date
            const reservation = yield database_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                yield tx.service.update({
                    where: { id: serviceId },
                    data: {
                        capacity: {
                            decrement: numberOfPeople
                        }
                    }
                });
                return yield tx.reservation.create({
                    data: {
                        userId,
                        serviceId,
                        reservationDate: reservationDateTime,
                        reservationTime: reservationDateTime,
                        numberOfPeople,
                        status: "pending"
                    }
                });
            }));
            return (0, reservation_model_1.toReservationResponse)(reservation);
        });
    }
}
exports.ReservationService = ReservationService;
