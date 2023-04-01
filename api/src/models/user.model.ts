import { Schema, model } from "mongoose";
import { UserDocument } from "../interfaces/usuario.interface";

const UserSchema = new Schema(
  {
    roleId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Role",
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cellphone: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    urlProfilePhoto: {
      type: String,
      default: null,
    },
    lastSessionDate: {
      type: Date,
      default: null,
    },
    score: {
      type: Number,
      default: 0,
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

const UserModel = model<UserDocument>("User", UserSchema);

export default UserModel;
