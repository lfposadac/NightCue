import { Schema, model } from "mongoose";
import { AlertDocument } from "../interfaces/alert.document";

const AlertSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    propiertyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Propierty",
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AlertModel = model<AlertDocument>("Alert", AlertSchema);

export default AlertModel;
