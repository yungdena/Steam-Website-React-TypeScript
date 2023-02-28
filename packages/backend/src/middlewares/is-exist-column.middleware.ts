import { Request, Response, NextFunction } from 'express';
import { Model, Types } from 'mongoose';

import { ErrorMessage } from '../types/error-message';

export const isExist =
  (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { todoCollectionId } = req.params;
      const isValid = Types.ObjectId.isValid(todoCollectionId);
      if (!isValid) {
        return res.status(400).send({ message: ErrorMessage.NotExist });
      }
      const checkExistence = await model.exists({ _id: todoCollectionId });
      if (!checkExistence) {
        return res.status(404).send({ message: ErrorMessage.NotExist });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
