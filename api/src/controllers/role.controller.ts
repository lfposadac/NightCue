import { Request, Response } from "express";
import { CreateRoleDto } from "../dtos/role.dto";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import { RoleDocument } from "../interfaces/role.interface";
import roleService from "../services/role.service";
import { createError } from "../utils/errors/createError";

export const getRoles = () => {
  return async (req: Request, res: Response) => {
    try {
      const roles: RoleDocument[] = await roleService.getRoles();
      return res
        .status(200)
        .json({ message: "Roles retrieved", status: 200, data: roles });
    } catch (e) {
      const errorResponse: ErrorResponse = createError(e);
      return res.status(errorResponse.status).json(errorResponse);
    }
  }
}

export const createRole = () => {
  return async (req: Request, res: Response) => {
    try {
      const { name, description, access_ids } = req.body;
      const roleDto: CreateRoleDto = {
        name,
        description,
        access_ids,
      };
      const role: RoleDocument = await roleService.createRole(roleDto);
      return res
        .status(200)
        .json({ message: "Role created", status: 200, data: role });
    } catch (e) {
      const errorResponse: ErrorResponse = createError(e);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};
