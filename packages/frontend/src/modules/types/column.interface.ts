import { ICard } from './card.interface';

export interface IColumn {
  title: string;
  _id: string;
  todos: ICard[];
}
