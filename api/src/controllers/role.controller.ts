import { Request, Response } from "express";
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from "../dtos/role.dto";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import { RoleDocument } from "../interfaces/role.interface";
import roleService from "../services/role.service";
import { createError } from "../utils/errors/createError";

export const getRoles = () => {
  return async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const { id, ...rest } = query;
      const queryRole: QueryRoleDto = {
        ...(id && { _id: id as string }),
        ...rest,
      };
      const roles: RoleDocument[] = await roleService.getRoles(queryRole);
      return res
        .status(200)
        .json({ message: "Roles retrieved", status: 200, data: roles });
    } catch (e) {
      const errorResponse: ErrorResponse = createError(e);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

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

export const updateRole = () => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateRole: UpdateRoleDto = req.body;
      const role: RoleDocument = await roleService.updateRole(id, updateRole);
      return res
        .status(200)
        .json({ message: "Role updated", status: 200, data: role });
    } catch (e) {
      const errorResponse: ErrorResponse = createError(e);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const deleteRole = () => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role: RoleDocument = await roleService.deleteRole(id);
      return res
        .status(200)
        .json({ message: "Role deleted", status: 200, data: role });
    } catch (e) {
      const errorResponse: ErrorResponse = createError(e);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};
