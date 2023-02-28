import { Router } from 'express';

import todoCollectionController from '../../controllers/todo-collection.controller';
import { validate, todoCollectionSchema } from '../../middlewares/validate.middleware';
import { tryCatchWrap } from '../../middlewares/try-catch.middleware';

const todoCollectionsRouter: Router = Router();

todoCollectionsRouter.get(
  '/:userName',
  tryCatchWrap(todoCollectionController.getAll.bind(todoCollectionController))
);

todoCollectionsRouter.post(
  '/:userName',
  validate(todoCollectionSchema),
  tryCatchWrap(todoCollectionController.create.bind(todoCollectionController))
);

todoCollectionsRouter.delete(
  '/:todoCollectionId',
  tryCatchWrap(todoCollectionController.delete.bind(todoCollectionController))
);

todoCollectionsRouter.patch(
  '/:todoCollectionId',
  tryCatchWrap(todoCollectionController.update.bind(todoCollectionController))
);

export default todoCollectionsRouter;
