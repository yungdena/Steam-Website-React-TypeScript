import { Model, model, Schema } from "mongoose";
import { IApp, ILanguage } from "../types/app.type";
import { IReview } from "../types/app.type";

const reviewSchema = new Schema<IReview>({
  rate: { type: Boolean, required: true },
  description: { type: String, required: true },
});

const languageSchema = new Schema<ILanguage>({
  interface: { type: [String], required: true },
  fullAudio: { type: [String], required: true },
  subtitles: { type: [String], required: true },
});

export const appSchema: Schema<IApp> = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  developer: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  reviews: {
    type: [reviewSchema],
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  genre: {
    type: [String],
    required: true
  },
  price: {
    type: String,
    required: true
  },
  newPrice: {
    type: String,
    required: false
  },
  titleImage: {
    type: String,
    required: true
  },
  imagesUrl: {
    type: [String],
    required: true
  },
  languages: {
    type: languageSchema,
    required: true
  },
  bannerImage: {
    type: String,
  }
});

export const AppModel: Model<IApp> = model("App", appSchema);
