import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from "../dtos/role.dto";
import { RoleDocument } from "../interfaces/role.interface";
import RoleModel from "../models/role.model";

class RoleService {
  public async getRoles(query: QueryRoleDto = {}): Promise<RoleDocument[]> {
    try {
      const roles: RoleDocument[] = await RoleModel.find(query);
      return roles;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async createRole(roleDto: CreateRoleDto): Promise<RoleDocument> {
    try {
      const role = new RoleModel(roleDto);
      const savedRole = await role.save();
      return savedRole;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateRole(id: string, roleDto: UpdateRoleDto): Promise<RoleDocument> {
    try {
      const updatedAccess = await RoleModel.findByIdAndUpdate(id, roleDto, {
        new: true,
      });
      if (!updatedAccess) throw new Error("Role not found");
      return updatedAccess;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteRole(id: string): Promise<RoleDocument> {
    try {
      const deletedRole = await RoleModel.findByIdAndDelete(id, {
        new: true,
      });
      if (!deletedRole) throw new Error("Role not found");
      return deletedRole;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

const roleService = new RoleService();

export default roleService;
