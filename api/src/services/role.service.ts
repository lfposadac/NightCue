import { CreateRoleDto } from "../dtos/role.dto";
import { RoleDocument } from "../interfaces/role.interface";
import RoleModel from "../models/role.model";

class RoleService {

  public async getRoles(): Promise<RoleDocument[]> {
    try {
      const roles: RoleDocument[] = await RoleModel.find();
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
}

const roleService = new RoleService();

export default roleService;
