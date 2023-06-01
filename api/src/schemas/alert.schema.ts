import * as Joi from "joi";

const id = Joi.string().min(24).max(24);
const userId = Joi.string().min(24).max(24);
const propiertyId = Joi.string().min(24).max(24);
const message = Joi.string().min(1).max(100);
const status = Joi.boolean();

export const getAlertSchema = Joi.object({
  id: id.required(),
});

export const queryAlertSchema = Joi.object({
  userId,
  propiertyId,
  status,
});

export const createAlertSchema = Joi.object({
  userId: userId.required(),
  propiertyId: propiertyId.required(),
  message: message.required(),
});

export const updateAlertSchema = Joi.object({
  status: status.required(),
});
