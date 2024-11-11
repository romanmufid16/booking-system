import express from "express";
import { UserController } from "../controllers/user.controller";
import { ServiceController } from "../controllers/service.controller";

export const publicRouter = express.Router();
publicRouter.post('/users/register', UserController.register);
publicRouter.post('/users/auth', UserController.login);
publicRouter.get('/services', ServiceController.list);
publicRouter.post('/services/create', ServiceController.create);