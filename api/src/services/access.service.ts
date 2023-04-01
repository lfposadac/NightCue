import AccessModel from "../models/access.model";
import { AccessDocument } from "../interfaces/access.interface";
import { CreateAccessDto } from "../dtos/access.dto";

class AccessService {
  async getAccess(): Promise<AccessDocument[]> {
    try {
      const accesses = await AccessModel.find();
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
}

const accessService = new AccessService();
export default accessService;
