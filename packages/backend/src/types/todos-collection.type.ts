import { ITodo } from './todos.type';

export interface ITodoCollection extends Document {
  title: string;
  todos: ITodo[];
  userName: string;
}
