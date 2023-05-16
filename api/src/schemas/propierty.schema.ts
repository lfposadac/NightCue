import * as Joi from "joi";

const id = Joi.string().min(24).max(24);
const userId = Joi.string().min(24).max(24);
const name = Joi.string().min(3).max(100);
const capacity = Joi.number().integer().min(1);
const address = Joi.string().min(5).max(100);
const contact = Joi.string().min(5).max(100);
const schedule = Joi.string().min(5).max(100);

export const getPropiertySchema = Joi.object({
  id: id.required(),
});

export const queryPropiertySchema = Joi.object({
  userId,
});

export const createPropiertySchema = Joi.object({
  userId: userId.required(),
  name: name.required(),
  capacity: capacity.required(),
  address: address.required(),
  contact: contact.required(),
  schedule: schedule.required(),
});

export const updatePropiertySchema = Joi.object({
  name,
  capacity,
  address,
  contact,
  schedule,
});
