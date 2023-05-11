import * as Joi from "joi";

// Id is id of mongodb, so it's a string
const id = Joi.string().length(24);
const name = Joi.string().min(3).max(100);
const description = Joi.string().min(3).max(300);
const status = Joi.boolean();

export const getAccessSchema = Joi.object({
  id: id.required(),
});

export const createAccessSchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

export const updateAccessSchema = Joi.object({
  name,
  description,
  status,
});

export const queryAccessSchema = Joi.object({
  id,
});
