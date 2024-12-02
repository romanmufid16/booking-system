import { prismaClient } from "../app/database";
import { ResponseError } from "../errors/error.response";
import { LoginRequest, LoginResponse, RegisterRequest, toUserResponse, UserResponse } from "../models/user.model";
import { UserValidation } from "../validation/user.validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class UserService {

  static async register(req: RegisterRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      req
    );

    const checkEmail = await prismaClient.user.findUnique({
      where: {
        email: registerRequest.email
      }
    });

    if (checkEmail) {
      throw new ResponseError(400, 'Email already registered');
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest
    });

    return toUserResponse(user);
  }

  static async login(req: LoginRequest): Promise<LoginResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, req);

    const user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email
      }
    });

    if (!user) {
      throw new ResponseError(401, 'Invalid credentials');
    }

    const isValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!isValid) {
      throw new ResponseError(401, 'Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    });

    return {
      message: 'Login berhasil',
      token: token
    }
  }

}