import { Schema, model } from "mongoose";
import { RoleDocument } from "../interfaces/role.interface";

const RoleSchema = new Schema<RoleDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    access_ids: {
      type: [String],
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

const RoleModel = model<RoleDocument>("Role", RoleSchema);

export default RoleModel;
