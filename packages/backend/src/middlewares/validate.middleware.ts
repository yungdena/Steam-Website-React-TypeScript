import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { isValidObjectId, Model, Types } from 'mongoose';

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

export const isExist =
  (model: Model<any>) =>
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const isValid = isValidObjectId(id);
      console.log(`isValid: ${isValid}`)
      if (!isValid) {
        return 'Item Does Not Exist';
      }
      const checkExistance = await model.exists({ _id: id });
      if (!checkExistance) {
        return "Item Does Not Exist";
      }
      next();
    } catch (error) {
      next(error);
    }
  };