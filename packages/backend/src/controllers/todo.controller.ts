import { Request, Response } from 'express';

import { TodoService } from '../services/todo.service';
import { ITodo } from '../types/todos.type';
import { IRequestBody } from '../types/request-body';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async create(req: Request, res: Response) {
    const { userName } = req.params;
    const { title, columnTitle } = req.body;

    await this.todoService.create({ userName, title, res, columnTitle });
  }

  async getAll(req: Request, res: Response) {
    const { userName } = req.params;

    await this.todoService.getAll(userName, res);
  }

  async getById(req: IRequestBody<ITodo>) {
    const todo = await this.todoService.getById(req.params.todoId);

    return { statusCode: 200, success: true, data: todo };
  }

  async update(req: IRequestBody<ITodo>) {
    await this.todoService.update(req.params.todoId, req.body);

    return { statusCode: 200, success: true, data: req.body };
  }

  async delete(req: IRequestBody<ITodo>) {
    await this.todoService.delete(req.params.todoId);

    return { statusCode: 204, success: true };
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
