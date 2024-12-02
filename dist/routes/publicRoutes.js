"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const service_controller_1 = require("../controllers/service.controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post('/users/register', user_controller_1.UserController.register);
exports.publicRouter.post('/users/auth', user_controller_1.UserController.login);
exports.publicRouter.get('/services', service_controller_1.ServiceController.list);
