import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const schemaValidation = (
  schema: Joi.ObjectSchema<any>,
  property: "body" | "query" | "params" | "headers"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};
