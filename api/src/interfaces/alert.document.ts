import { Document } from "mongoose";

export interface AlertDocument extends Document {
  userId: string;
  propiertyId: string;
  message: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
