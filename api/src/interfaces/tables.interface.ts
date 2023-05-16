import { Document } from "mongoose";

export interface TableDocument extends Document {
  idPropierty: string;
  type: string;
  capacity: number;
  description: string;
  status: boolean;
  ubication: string;
  typesOfSeats: string;
  accessibility: boolean;
  reservationCost: number;
  minimumConsumption: number;
  createdAt: Date;
  updatedAt: Date;
}
