import express from "express";
import { ServiceController } from "../controllers/service.controller";
import { ReservationController } from "../controllers/reservation.controller";

export const apiRoutes = express.Router();
apiRoutes.post('/services/create', ServiceController.create);
apiRoutes.post('/reservations/create', ReservationController.create);