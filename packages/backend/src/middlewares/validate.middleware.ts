import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const todoSchema = Joi.object().keys({
  columnTitle: Joi.string().required(),
  title: Joi.string().required()
});

export const todoCollectionSchema = Joi.object().keys({
  userName: Joi.string().required(),
  title: Joi.string().required()
});

export function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json(error.details);
    } else {
      next();
    }
  };
}
