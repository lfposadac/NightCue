import { Request, Response } from "express";
import { QueryUserDto } from "../dtos/user.dto";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import { UserDocument } from "../interfaces/usuario.interface";
import userService from "../services/user.service";
import { createError } from "../utils/errors/createError";
import { encryptString } from "../utils/encrypt/encrypt";

export const deleteUser = () => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedUser: UserDocument = await userService.deleteUser(id);
      return res
        .status(201)
        .json({ message: "User deleted", status: 201, data: deletedUser });
    } catch (e) {
      const errorResponse: ErrorResponse = createError(e);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const updateUser = () => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const body = req.body;

      if (body.password) {
        body.password = await encryptString(body.password);
      }

      const user: UserDocument = await userService.updateUser(id, body);
      return res
        .status(201)
        .json({ message: "User updated", status: 201, data: user });
    } catch (e) {
      const errorResponse: ErrorResponse = createError(e);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const getUsers = () => {
  return async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const { id, ...rest } = query;
      const queryDto: QueryUserDto = {
        ...(id && { _id: id as string }),
        ...rest,
      };

      const users: UserDocument[] = await userService.getUsers(queryDto);
      return res
        .status(200)
        .json({ message: "Users fetched", status: 200, data: users });
    } catch (e) {
      const errorResponse: ErrorResponse = createError(e);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};
