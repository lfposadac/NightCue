import { Request, Response } from "express";
import { CreateAccessDto } from "../dtos/access.dto";
import { AccessDocument } from "../interfaces/access.interface";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import accessService from "../services/access.service";
import { createError } from "../utils/errors/createError";

export const getAccess = () => {
  return async (req: Request, res: Response) => {
    try {
      const access: AccessDocument[] = await accessService.getAccess();
      return res
        .status(200)
        .json({ message: "Accesses fetched", status: 200, data: access });
    } catch (e) {
      const errorResponse: ErrorResponse = createError(e);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const createAccess = () => {
  return async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const accessDto: CreateAccessDto = {
        name,
        description,
      };
      const access: AccessDocument = await accessService.createAccess(
        accessDto
      );
      return res
        .status(200)
        .json({ message: "Access created", status: 200, data: access });
    } catch (e) {
      const errorResponse: ErrorResponse = createError(e);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};
