import { CreateAlertDto, UpdateAlertDto } from "../dtos/alert.dto";
import { AlertDocument } from "../interfaces/alert.document";
import AlertModel from "../models/alert.model";

class AlertService {
  async getAlert(where = {}): Promise<AlertDocument[]> {
    try {
      const alerts = await AlertModel.find(where);
      return alerts;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createAlert(alertDto: CreateAlertDto): Promise<AlertDocument> {
    try {
      const alert = new AlertModel({ ...alertDto, status: true });
      const savedAlert = await alert.save();
      return savedAlert;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateAlert(
    id: string,
    alertDto: UpdateAlertDto
  ): Promise<AlertDocument> {
    try {
      const alertUpdated = await AlertModel.findByIdAndUpdate(id, alertDto, {
        new: true,
      });
      if (!alertUpdated) throw new Error("Alert not found");
      return alertUpdated;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteAlert(id: string): Promise<AlertDocument> {
    try {
      const alertDeleted = await AlertModel.findByIdAndDelete(id);
      if (!alertDeleted) throw new Error("Alert not found");
      return alertDeleted;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

const alertService = new AlertService();

export default alertService;
