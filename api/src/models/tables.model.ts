import { Schema, model } from "mongoose";
import { TableDocument } from "../interfaces/tables.interface";

const TablesSchema = new Schema(
  {
    idPropierty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Propierty",
    },
    type: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    ubication: {
      type: String,
      required: true,
    },
    typesOfSeats: {
      type: String,
      required: true,
    },
    accessibility: {
      type: Boolean,
      default: true,
    },
    reservationCost: {
      type: Number,
      required: true,
    },
    minimumConsumption: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TablesModel = model<TableDocument>("Tables", TablesSchema);

export default TablesModel;
