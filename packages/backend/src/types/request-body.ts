import { Request } from 'express';

export interface IRequestBody<T> extends Request {
  body: T;
}
