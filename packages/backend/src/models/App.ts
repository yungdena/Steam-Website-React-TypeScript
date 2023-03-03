import { Model, model, Schema } from "mongoose";
import { IApp } from "../types/app.type";

export const appSchema: Schema<IApp> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  reviewsRate: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imagesUrl: {
    type: [String],
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  }
});

export const AppModel: Model<IApp> = model("App", appSchema);
