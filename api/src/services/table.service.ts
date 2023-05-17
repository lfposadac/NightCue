import {
  CreateTableDto,
  QueryTableDto,
  UpdateTableDto,
} from "../dtos/tables.dto";
import { TableDocument } from "../interfaces/tables.interface";
import TablesModel from "../models/tables.model";

class TableService {
  async getTables(query: QueryTableDto): Promise<TableDocument[]> {
    try {
      const tables = await TablesModel.find(query);
      return tables;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createTable(tableDto: CreateTableDto): Promise<TableDocument> {
    try {
      const table = new TablesModel(tableDto);
      const savedTable = await table.save();
      return savedTable;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateTable(
    id: string,
    tableDto: UpdateTableDto
  ): Promise<TableDocument> {
    try {
      const tableUpdated = await TablesModel.findByIdAndUpdate(id, tableDto, {
        new: true,
      });
      if (!tableUpdated) throw new Error("Table not found");
      return tableUpdated;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteTable(id: string): Promise<TableDocument> {
    try {
      const tableDeleted = await TablesModel.findByIdAndDelete(id);
      if (!tableDeleted) throw new Error("Table not found");
      return tableDeleted;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

const tableService = new TableService();

export default tableService;
