import { Response } from 'express';
// import TodoModel from '../models/todo';

import { TodoCollectionModel } from '../models/todo-collection';
import { ITodoCollection } from '../types/todos-collection.type';

interface ICreateColumn {
  title: string;
  userName: string;
  res: Response;
}

export default class TodoCollectionService {
  async create({ userName, res, title }: ICreateColumn) {
    console.log('before createColumn');
    const createdColumn = await TodoCollectionModel.create({ userName, title });
    console.log('createdColumn', createdColumn);
    if (!createdColumn) {
      res.status(400).send({ message: 'Error creating column' });
      return;
    }
    console.log('no error');
    res.send({ createdColumn });
  }

  async getAll(userName: string, res: Response) {
    console.log('service getAll');
    const todoList = await TodoCollectionModel.find({ userName });
    console.log('list', todoList);
    if (!todoList) {
      res.status(404).send({ message: 'Todo list error' });
      return;
    }

    res.send({ todoList });
  }

  async getById(todoCollectionId: string) {
    return TodoCollectionModel.findById(todoCollectionId);
  }

  async update(todoCollectionId: string, column: ITodoCollection) {
    return TodoCollectionModel.findByIdAndUpdate(todoCollectionId, column);
  }

  async delete(todoCollectionId: string) {
    await TodoCollectionModel.findByIdAndDelete(todoCollectionId);
  }
}
