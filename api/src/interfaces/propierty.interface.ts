import { Document } from "mongoose";

export interface PropiertyDocument extends Document {
    userId: string;
    name: string;
    capacity: number;
    address: string;
    contact: string;
    schedule: string;
    createdAt: Date;
    updatedAt: Date;
}