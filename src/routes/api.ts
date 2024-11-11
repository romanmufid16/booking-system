import express from "express";
import { ServiceController } from "../controllers/service.controller";

export const apiRoutes = express.Router();
apiRoutes.post('/services/create', ServiceController.create);