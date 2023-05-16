import { CreatePropertyDTo, UpdatePropiertyDto } from "../dtos/propierty.dto";
import { PropiertyDocument } from "../interfaces/propierty.interface";
import PropiertyModel from "../models/propierty.model";

class PropiertyService {
  async getPropierty(where = {}): Promise<PropiertyDocument[]> {
    try {
      where;
      const propierties = await PropiertyModel.find(where);
      return propierties;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createPropierty(
    propiertyDto: CreatePropertyDTo
  ): Promise<PropiertyDocument> {
    try {
      const propierty = new PropiertyModel(propiertyDto);
      const savedPropierty = await propierty.save();
      return savedPropierty;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updatePropierty(
    id: string,
    propiertyDto: UpdatePropiertyDto
  ): Promise<PropiertyDocument> {
    try {
      const propiertyUpdated = await PropiertyModel.findByIdAndUpdate(
        id,
        propiertyDto,
        {
          new: true,
        }
      );
      if (!propiertyUpdated) throw new Error("Propierty not found");
      return propiertyUpdated;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deletePropierty(id: string): Promise<PropiertyDocument> {
    try {
      const propiertyDeleted = await PropiertyModel.findByIdAndDelete(id);
      if (!propiertyDeleted) throw new Error("Propierty not found");
      return propiertyDeleted;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

const propiertyService = new PropiertyService();

export default propiertyService;
