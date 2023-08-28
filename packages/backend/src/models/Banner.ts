import { Model, model, Schema } from "mongoose";
import { IBanner } from "../types/banner-type";

export const bannerSchema: Schema<IBanner> = new Schema({
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  titleImage: {
    type: String,
    required: true,
  },
  appid: {
    type: String,
    required: true,
  },
  imagesUrl: {
    type: [String],
    required: true,
  },
});

export const BannerModel: Model<IBanner> = model("Banner", bannerSchema);
