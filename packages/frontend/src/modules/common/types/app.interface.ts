export interface IReview {
  rate: boolean;
  description: string;
}

export interface ILanguage {
  interface: string[];
  fullAudio: string[];
  subtitles: string[];
}

export interface IApp {
  title: string;
  description: string;
  bannerImage: string;
  titleImage: string;
  reviews: IReview[];
  price: string;
  releaseDate: string;
  publisher: string;
  developer: string;
  tags: string[];
  genre: string[];
  imagesUrl: string[];
  languages: ILanguage;
  [key: string]: any;
}
