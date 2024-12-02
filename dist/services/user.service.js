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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../app/database");
const error_response_1 = require("../errors/error.response");
const user_model_1 = require("../models/user.model");
const user_validation_1 = require("../validation/user.validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserService {
    static register(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, req);
            const checkEmail = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: registerRequest.email
                }
            });
            if (checkEmail) {
                throw new error_response_1.ResponseError(400, 'Email already registered');
            }
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            const user = yield database_1.prismaClient.user.create({
                data: registerRequest
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, req);
            const user = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: loginRequest.email
                }
            });
            if (!user) {
                throw new error_response_1.ResponseError(401, 'Invalid credentials');
            }
            const isValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!isValid) {
                throw new error_response_1.ResponseError(401, 'Invalid credentials');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            return {
                message: 'Login berhasil',
                token: token
            };
        });
    }
}
exports.UserService = UserService;
