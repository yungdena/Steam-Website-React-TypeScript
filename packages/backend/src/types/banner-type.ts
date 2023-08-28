import { Document } from "mongoose";

export interface IBanner extends Document {
  title: string;
  price: string;
  tags: string[];
  imagesUrl: string[];
  titleImage: string;
  reason: string;
  appid: string;
  [key: string]: any;
}
