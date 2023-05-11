import { Request, Response } from "express";
import {
  CreateAccessDto,
  QueryAccessDto,
  UpdateAccessDto,
} from "../dtos/access.dto";
import { AccessDocument } from "../interfaces/access.interface";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import accessService from "../services/access.service";
import { createError } from "../utils/errors/createError";

export const getAccess = () => {
  return async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const { id, ...rest } = query;
      const queryDto: QueryAccessDto = {
        ...(id && { _id: id as string }),
        ...rest,
      };

      const access: AccessDocument[] = await accessService.getAccess(queryDto);
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

export const updateAccess = () => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateAccess: UpdateAccessDto = req.body;
      const access: AccessDocument = await accessService.updateAccess(
        id,
        updateAccess
      );
      return res
        .status(201)
        .json({ message: "Access updated", status: 201, data: access });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const deleteAccess = () => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const eletedAccess = await accessService.deleteAccess(id);
      return res.status(201).json({
        message: "Access deleted",
        status: 201,
        data: eletedAccess,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};
