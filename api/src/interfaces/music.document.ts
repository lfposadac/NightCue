import { Document } from "mongoose";

export interface MusicDocument extends Document {
  userId: string;
  propiertyId: string;
  name: string;
  description: string;
  status: boolean;
  link: string;
  artist: string;
  album: string;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}
