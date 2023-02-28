import mongoose, { Schema, Model } from 'mongoose';
import { ITodo } from '../types/todos.type';

export const TodoSchema: Schema<any, Model<ITodo>> = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  userName: { type: String, required: true },
  columnTitle: { type: String, required: true }
});

const TodoModel: Model<ITodo> = mongoose.model('Todo', TodoSchema);

export default TodoModel;
