import { Document } from "mongoose";

export interface RoleDocument extends Document {
  name: string;
  description: string;
  access_ids: string[];
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
