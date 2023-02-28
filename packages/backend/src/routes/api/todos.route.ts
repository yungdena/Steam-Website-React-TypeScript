import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { isExist } from '../../middlewares/is-exist-todo.middleware';
import { validate, todoSchema } from '../../middlewares/validate.middleware';
import { tryCatchWrap } from '../../middlewares/try-catch.middleware';
import TodoModel from '../../models/todo';

const todosRouter: Router = Router();

todosRouter.get('/:userName', tryCatchWrap(todoController.getAll.bind(todoController)));

todosRouter.post(
  '/:userName',
  validate(todoSchema),
  tryCatchWrap(todoController.create.bind(todoController))
);

todosRouter.delete(
  '/:todoId',
  isExist(TodoModel),
  tryCatchWrap(todoController.delete.bind(todoController))
);

todosRouter.patch(
  '/:todoId',
  isExist(TodoModel),
  tryCatchWrap(todoController.update.bind(todoController))
);

export default todosRouter;
