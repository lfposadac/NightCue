import { Schema, model } from "mongoose";
import { MusicDocument } from "../interfaces/music.document";

const MusicSchema = new Schema(
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
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    link: {
      type: String,
    },
    artist: {
      type: String,
    },
    album: {
      type: String,
    },
    genre: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MusicModel = model<MusicDocument>("Music", MusicSchema);

export default MusicModel;
