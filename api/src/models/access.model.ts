import { Schema, model } from "mongoose";
import { AccessDocument } from "../interfaces/access.interface";

const AccessSchema = new Schema<AccessDocument>(
  {
    name: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const AccessModel = model<AccessDocument>("Access", AccessSchema);

export default AccessModel;
