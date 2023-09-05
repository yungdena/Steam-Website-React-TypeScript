export interface IReview {
  rate: boolean;
  description: string;
}

export interface IApp {
  title: string;
  description: string;
  reviews: IReview[];
  price: string;
  releaseDate: string;
  publisher: string;
  developer: string;
  tags: string[];
  genre: string[];
  imagesUrl: string[];
  languages: string;
  [key: string]: any;
}
