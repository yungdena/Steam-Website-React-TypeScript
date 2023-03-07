import { Document } from "mongoose";

export interface ILanguage {
  interface: [string];
  fullAudio: [string];
  Subtitles: [string];
}

export interface IReview {
  rate: boolean;
  description: string;
}

export interface IApp extends Document {
  title: string;
  description: string;
  reviews: IReview;
  price: string;
  releaseDate: string;
  publisher: string;
  developer: string;
  tags: string[];
  genre: string[];
  imagesUrl: string[];
  languages: string;
  [key: string]: any;
  bannerImage: string;
}
