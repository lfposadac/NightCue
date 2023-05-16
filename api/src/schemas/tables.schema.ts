import * as Joi from "joi";

// Id is id of mongodb, so it's a string
const id = Joi.string().length(24);
const idPropierty = Joi.string().length(24);
const type = Joi.string().min(3).max(100);
const capacity = Joi.number().min(1).max(100);
const description = Joi.string().min(3).max(300);
const status = Joi.boolean();
const ubication = Joi.string().min(3).max(300);
const typesOfSeats = Joi.string().min(3).max(300);
const accessibility = Joi.boolean();
const reservationCost = Joi.number();
const minimumConsumption = Joi.number();

export const getTablesSchema = Joi.object({
  id: id.required(),
});

export const createTablesSchema = Joi.object({
  idPropierty: idPropierty.required(),
  type: type.required(),
  capacity: capacity.required(),
  description: description.required(),
  ubication: ubication.required(),
  typesOfSeats: typesOfSeats.required(),
  reservationCost: reservationCost.required(),
  minimumConsumption: minimumConsumption.required(),
});

export const updateTablesSchema = Joi.object({
  type,
  capacity,
  description,
  status,
  ubication,
  typesOfSeats,
  accessibility,
  reservationCost,
  minimumConsumption,
});

export const queryTablesSchema = Joi.object({
  id,
  idPropierty,
});
