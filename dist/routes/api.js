"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("../controllers/service.controller");
const reservation_controller_1 = require("../controllers/reservation.controller");
exports.apiRoutes = express_1.default.Router();
exports.apiRoutes.post('/services/create', service_controller_1.ServiceController.create);
exports.apiRoutes.post('/reservations/create', reservation_controller_1.ReservationController.create);
