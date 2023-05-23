import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import { createError } from "../utils/errors/createError";
import { AlertDocument } from "../interfaces/alert.document";
import alertService from "../services/alert.service";
import { CreateAlertDto, UpdateAlertDto } from "../dtos/alert.dto";

export const getAlert = () => {
  return async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const alert: AlertDocument[] = await alertService.getAlert(query);
      return res.status(200).json({
        message: "Alert found",
        status: 200,
        data: alert,
      });
    } catch (error: any) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const createAlert = () => {
  return async (req: Request, res: Response) => {
    try {
      const alert: CreateAlertDto = req.body;
      const newAlert: AlertDocument = await alertService.createAlert(alert);
      return res.status(200).json({
        message: "Alert created",
        status: 200,
        data: newAlert,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const updateAlert = () => {
  return async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const alert: UpdateAlertDto = req.body;
      const alertUpdated: AlertDocument = await alertService.updateAlert(
        id,
        alert
      );
      return res.status(200).json({
        message: "Alert updated",
        status: 200,
        data: alertUpdated,
      });
    } catch (error: any) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const deleteAlert = () => {
  return async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const alertDeleted: AlertDocument = await alertService.deleteAlert(id);
      return res.status(200).json({
        message: "Alert deleted",
        status: 200,
        data: alertDeleted,
      });
    } catch (error: any) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};
