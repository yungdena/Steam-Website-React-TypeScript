import { Request, Response } from 'express';

import TodoCollectionService from '../services/todo-collection.service';
import { IRequestBody } from '../types/request-body';
import { ITodoCollection } from '../types/todos-collection.type';

export class TodoCollectionController {
  constructor(private columnService: TodoCollectionService) {}

  async create(req: Request, res: Response) {
    console.log('controller');
    const { userName } = req.params;
    const { title } = req.body;
    console.log(userName);
    console.log(title);
    await this.columnService.create({ userName, res, title });
  }

  async getAll(req: Request, res: Response) {
    const { userName } = req.params;

    await this.columnService.getAll(userName, res);
  }

  async getById(req: IRequestBody<ITodoCollection>) {
    const column = await this.columnService.getById(req.params.todoCollectionId);

    return { statusCode: 200, success: true, data: column };
  }

  async update(req: IRequestBody<ITodoCollection>) {
    const column = await this.columnService.update(req.params.todoCollectionId, req.body);
    return { statusCode: 200, success: true, data: column };
  }

  async delete(req: IRequestBody<ITodoCollection>) {
    const column = await this.columnService.delete(req.params.todoCollectionId);

    return { statusCode: 204, success: true, data: column };
  }
}

const todoCollectionController = new TodoCollectionController(new TodoCollectionService());
export default todoCollectionController;
