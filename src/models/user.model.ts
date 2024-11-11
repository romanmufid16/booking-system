import { User } from "@prisma/client";
import { Request } from "express";

export type UserResponse = {
  username: string;
  email: string;
}

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
}

export type LoginRequest = {
  email: string;
  password: string;
}

export type LoginResponse = {
  message: string;
  token: string;
}

export function toUserResponse(user: User): UserResponse {
  return {
    username: user.username,
    email: user.email
  }
}

export interface UserRequest extends Request {
    user?: User;
}