import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import { createError } from "../utils/errors/createError";
import { CreatePropertyDTo } from "../dtos/propierty.dto";
import { PropiertyDocument } from "../interfaces/propierty.interface";
import propiertyService from "../services/propierty.service";

export const getPropierty = () => {
  return async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const propierties: PropiertyDocument[] =
        await propiertyService.getPropierty(query);
      return res.status(200).json({
        message: "Propierties found",
        status: 200,
        data: propierties,
      });
    } catch (error: any) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const createProperty = () => {
  return async (req: Request, res: Response) => {
    try {
      const propierty: CreatePropertyDTo = req.body;
      const newPropierty: PropiertyDocument =
        await propiertyService.createPropierty(propierty);
      return res.status(200).json({
        message: "Propierty created",
        status: 200,
        data: newPropierty,
      });
    } catch (error: any) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};
