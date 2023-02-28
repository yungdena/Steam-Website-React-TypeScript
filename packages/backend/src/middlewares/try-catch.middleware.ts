import { Request, Response, NextFunction } from 'express';

export function tryCatchWrap<T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T | null>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export function tryCatchNew<T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T | null>
) {
  console.log('TryCatch');
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req, res, next);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).send(error);
    }
  };
}
