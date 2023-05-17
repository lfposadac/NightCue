import { Document } from "mongoose";

enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export interface BookingDocument extends Document {
  idTable: string;
  userId: string;
  date: Date;
  numberOfGuests: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}
