import { Model, model, Schema } from 'mongoose';
import { ITodoCollection } from '../types/todos-collection.type';
import { TodoSchema } from './todo';

const todoCollectionSchema: Schema<any, Model<ITodoCollection>> = new Schema({
  title: { type: String, required: true },
  todos: [TodoSchema],
  userName: { type: String, required: true }
});

export const TodoCollectionModel: Model<ITodoCollection> = model(
  'TodoCollection',
  todoCollectionSchema
);
