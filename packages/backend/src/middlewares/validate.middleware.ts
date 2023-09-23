import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { isValidObjectId, Model } from 'mongoose';
import { UserModel } from '../models/User';

export const appSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.array().required(),
  genre: Joi.array().required(),
  developer: Joi.string().required(),
  publisher: Joi.string().required(),
  releaseDate: Joi.string().required(),
  price: Joi.string().required(),
  newPrice: Joi.string(),
  imagesUrl: Joi.array().required(),
  titleImage: Joi.string().required(),
  reviews: Joi.array(),
  bannerImage: Joi.string().required(),
  languages: Joi.object().required(),
});

export const appCollectionSchema = Joi.object().keys({
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

export const userExistsByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const user = await UserModel.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    next(error);
  }
};