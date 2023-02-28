import { Response } from 'express';

import TodoModel from '../models/todo';
import { TodoCollectionModel } from '../models/todo-collection';
import { ITodo } from '../types/todos.type';

interface ICreatePayload {
  userName: string;
  columnTitle: string;
  title: string;
  res: Response;
}

export class TodoService {
  async create({ columnTitle, userName, title, res }: ICreatePayload) {
    console.log('todo service', columnTitle, userName, title);
    const createdTodo = await TodoModel.create({ userName, title, columnTitle });
    console.log('Created todo');
    if (!createdTodo) {
      res.status(400).send({ message: 'Todo card error' });
      return;
    }

    const updatedTodos = await TodoCollectionModel.findOneAndUpdate(
      {
        title: columnTitle,
        userName
      },
      {
        $push: { todos: { title, userName, columnTitle } }
      },
      {
        new: true
      }
    );

    console.log('updated todos', updatedTodos);

    if (!updatedTodos) {
      res.status(404).send({ message: 'Todo card error' });
      return;
    }

    res.send({ updatedTodos });
  }

  async getAll(userName: string, res: Response) {
    const todoCard = await TodoModel.find({ userName });

    if (!todoCard) {
      res.status(404).send({ message: 'Todo card error' });
      return;
    }

    res.send(todoCard);
  }

  async getById(id: string) {
    return TodoModel.findById(id);
  }

  async update(id: string, todo: ITodo) {
    return TodoModel.updateOne({ _id: id }, todo);
  }

  async delete(id: string) {
    await TodoModel.deleteOne({ _id: id });
  }
}
