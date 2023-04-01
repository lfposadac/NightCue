import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/user.dto";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import { UserDocument } from "../interfaces/usuario.interface";
import userService from "../services/user.service";
import { compareString } from "../utils/encrypt/compare";
import { encryptString } from "../utils/encrypt/encrypt";
import { createError } from "../utils/errors/createError";
import { getInfoUserOfBody } from "../utils/user/getInfoBody";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";

export const signIn = () => {
  return async (req: Request, res: Response) => {
    try {
      const secretKey = process.env.SECRET_KEY || "secretKey";
      const { email, password } = req.body;

      const user = await userService.findUser({ email });
      if (user instanceof UserModel) {
        const isPasswordCorrect = await compareString(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Password incorrect");
        }
        const token = jwt.sign({ userId: user.id }, secretKey, {
          expiresIn: "1h",
        });
        return res
          .status(200)
          .json({ message: "User logged", status: 200, data: { token } });
      }
    } catch (error: any) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const signUp = () => {
  return async (req: Request, res: Response) => {
    try {
      const body: any = req.body;
      const userDto: CreateUserDto = getInfoUserOfBody(body);
      userDto.password = await encryptString(userDto.password);
      const newUser: UserDocument = await userService.createUser(userDto);
      return res
        .status(200)
        .json({ message: "User created", status: 200, data: newUser });
    } catch (e: any) {
      const errorResponse: ErrorResponse = createError(e);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};
