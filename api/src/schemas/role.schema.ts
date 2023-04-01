import * as Joi from "joi";

const id = Joi.number().integer().min(1);
const name = Joi.string().min(3).max(100);
const description = Joi.string().min(3).max(300);
const access_ids = Joi.array().items(Joi.string());
const status = Joi.string().valid("active", "inactive");

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

export const deleteRoleSchema = Joi.object({
  id: id.required(),
});
