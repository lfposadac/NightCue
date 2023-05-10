import * as Joi from "joi";

const id = Joi.number().integer().min(1);
const roleId = Joi.string().min(24).max(24);
const name = Joi.string().min(3).max(100);
const lastName = Joi.string().min(3).max(100);
const password = Joi.string().min(8).max(100);
const email = Joi.string().email();
const cellphone = Joi.string().min(5).max(20);
const phone = Joi.string().min(5).max(20);
const address = Joi.string().min(5).max(100);
const urlProfilePhoto = Joi.string().min(5).max(100);
const lastSessionDate = Joi.date();
const score = Joi.number().integer().min(0);
const status = Joi.boolean();

export const createUserSchema = Joi.object({
  roleId: roleId.required(),
  name: name.required(),
  lastName: lastName.required(),
  password: password.required(),
  email: email.required(),
  cellphone: cellphone,
  phone: phone,
  address: address,
});

export const signInSchema = Joi.object({
    email: email.required(),
    password: password.required(),
})