import { Document } from "mongoose";

interface ILanguage {
  interface: boolean;
  fullAudio: boolean;
  Subtitles: boolean;
}

export interface IApp extends Document {
  id: string;
  title: string;
  description: string;
  reviewsRate: string;
  price: number;
  releaseDate: Date;
  publisher: string;
  developer: string;
  tags: string[];
  imagesUrl: string[];
  languages: string;
  [key: string]: any;
}
