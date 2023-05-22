import * as Joi from "joi";

const id = Joi.string().min(24).max(24);
const userId = Joi.string().min(24).max(24);
const propiertyId = Joi.string().min(24).max(24);
const name = Joi.string().min(5).max(100);
const description = Joi.string().min(5).max(100);
const status = Joi.boolean();
const link = Joi.string().min(5).max(100);
const artist = Joi.string().min(5).max(100);
const album = Joi.string().min(5).max(100);
const genre = Joi.string().min(5).max(100);

export const getMusicSchema = Joi.object({
  id: id.required(),
});

export const queryMusicSchema = Joi.object({
  userId,
  propiertyId,
});

export const createMusicSchema = Joi.object({
  userId: userId.required(),
  propiertyId: propiertyId.required(),
  name: name.required(),
  description,
  link,
  artist,
  album,
  genre,
});

export const updateMusicSchema = Joi.object({
  status: status.required(),
});
