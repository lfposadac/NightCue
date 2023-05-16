import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import { createError } from "../utils/errors/createError";
import {
  CreateTableDto,
  QueryTableDto,
  UpdateTableDto,
} from "../dtos/tables.dto";
import { TableDocument } from "../interfaces/tables.interface";
import tableService from "../services/table.service";

export const getTables = () => {
  return async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const { id, ...rest } = query;
      const queryDto: QueryTableDto = {
        ...(id && { _id: id as string }),
        ...rest,
      };
      const tables: TableDocument[] = await tableService.getTables(queryDto);
      return res.status(200).json({
        message: "Tables found",
        status: 200,
        data: tables,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const createTable = () => {
  return async (req: Request, res: Response) => {
    try {
      const tableBody: CreateTableDto = req.body;
      const table: TableDocument = await tableService.createTable(tableBody);
      return res.status(200).json({
        message: "Table created",
        status: 200,
        data: table,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const updateTable = () => {
  return async (req: Request, res: Response) => {
    try {
      const tableBody: UpdateTableDto = req.body;
      const { id } = req.params;
      const table: TableDocument = await tableService.updateTable(
        id,
        tableBody
      );
      return res.status(201).json({
        message: "Table updated",
        status: 201,
        data: table,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const deleteTable = () => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const table: TableDocument = await tableService.deleteTable(id);
      return res.status(201).json({
        message: "Table deleted",
        status: 201,
        data: table,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};
