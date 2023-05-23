import { Schema, model } from "mongoose";
import { PropiertyDocument } from "../interfaces/propierty.interface";

const UserSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PropiertyModel = model<PropiertyDocument>("Propierty", UserSchema);

export default PropiertyModel;
