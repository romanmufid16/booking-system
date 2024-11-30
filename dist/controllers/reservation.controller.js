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
exports.ReservationController = void 0;
const error_response_1 = require("../errors/error.response");
const reservation_service_1 = require("../services/reservation.service");
class ReservationController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                console.log("User in request:", (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                if (!userId) {
                    console.log("User ID tidak ditemukan!");
                    throw new error_response_1.ResponseError(400, 'User ID is required');
                }
                const request = req.body;
                request.userId = userId;
                const result = yield reservation_service_1.ReservationService.create(request);
                res.status(201).json({
                    message: 'Reservasi berhasil dibuat',
                    reservation: result
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ReservationController = ReservationController;
