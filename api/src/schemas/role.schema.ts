import * as Joi from "joi";

// Id of mongodb
const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const name = Joi.string().min(3).max(100);
const description = Joi.string().min(3).max(300);
const access_ids = Joi.array().items(Joi.string());
const status = Joi.boolean();

export const getRoleSchema = Joi.object({
  id: id.required(),
});

export const createRoleSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  access_ids: access_ids.required(),
});

export const updateRoleSchema = Joi.object({
  name,
  description,
  access_ids,
  status,
});

export const queryRoleSchema = Joi.object({
  id: id,
});
