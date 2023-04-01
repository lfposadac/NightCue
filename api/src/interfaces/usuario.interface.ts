import { Document } from "mongoose";

export interface WhereUser {
  email?: string;
}

export interface UserDocument extends Document {
  roleId: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  address: string;
  urlProfilePhoto: string;
  lastSessionDate: Date;
  score: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
