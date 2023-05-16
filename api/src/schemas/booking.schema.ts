import * as Joi from "joi";

// Id is id of mongodb, so it's a string
const id = Joi.string().length(24);
const idTable = Joi.string().length(24);
const userId = Joi.string().length(24);
const date = Joi.date();
const numberOfGuests = Joi.number().min(1).max(100);
const status = Joi.string().valid("PENDING", "CONFIRMED", "CANCELLED");

export const getBookingSchema = Joi.object({
  id: id.required(),
});

export const createBookingSchema = Joi.object({
  idTable: idTable.required(),
  userId: userId.required(),
  date: date.required(),
  numberOfGuests: numberOfGuests.required(),
});

export const updateBookingSchema = Joi.object({
  status,
  date,
  numberOfGuests,
});

export const queryBookingSchema = Joi.object({
  id,
  idTable,
  userId,
  date,
  status,
});
