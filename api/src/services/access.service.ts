import AccessModel from "../models/access.model";
import { AccessDocument } from "../interfaces/access.interface";
import {
  CreateAccessDto,
  QueryAccessDto,
  UpdateAccessDto,
} from "../dtos/access.dto";

class AccessService {
  async getAccess(where: QueryAccessDto = {}): Promise<AccessDocument[]> {
    try {
      console.log(where);
      const accesses = await AccessModel.find(where);
      return accesses;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async createAccess(accessDto: CreateAccessDto): Promise<AccessDocument> {
    try {
      const access = new AccessModel(accessDto);
      const savedAccess = await access.save();
      return savedAccess;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateAccess(
    id: String,
    access: UpdateAccessDto
  ): Promise<AccessDocument> {
    try {
      const updatedAccess = await AccessModel.findByIdAndUpdate(id, access, {
        new: true,
      });
      if (!updatedAccess) throw new Error("Access not found");
      return updatedAccess;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async deleteAccess(id: String): Promise<AccessDocument> {
    try {
      const deletedAccess = await AccessModel.findByIdAndDelete(id, {
        new: true,
      });
      if (!deletedAccess) throw new Error("Access not found");
      return deletedAccess;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

const accessService = new AccessService();
export default accessService;
