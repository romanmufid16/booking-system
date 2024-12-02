import express from "express";
import { ServiceController } from "../controllers/service.controller";
import { ReservationController } from "../controllers/reservation.controller";
import { checkRole } from "../middlewares/role.middleware";

export const apiRoutes = express.Router();

apiRoutes.post('/services/create', checkRole, ServiceController.create);
apiRoutes.put('/services/:id', checkRole, ServiceController.update);
apiRoutes.delete('/services/:id', checkRole, ServiceController.remove);


apiRoutes.post('/reservations/create', ReservationController.create);
