import { Document } from "mongoose";

export interface AccessDocument extends Document {
  name: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
