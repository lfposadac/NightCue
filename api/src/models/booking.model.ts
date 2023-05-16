import { Schema, model } from "mongoose";
import { BookingDocument } from "../interfaces/booking.interface";

const BookingSchema = new Schema(
  {
    idTable: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Tables",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    date: {
      type: Date,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = model<BookingDocument>("Booking", BookingSchema);

export default BookingModel;
