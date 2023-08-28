import { Router } from "express";
import bannersController from "../../controllers/banner.controller";

const bannersRouter: Router = Router();

bannersRouter.get("/", bannersController.getAll.bind(bannersController));

bannersRouter.get("/:id", bannersController.getById.bind(bannersController));

bannersRouter.post("/", bannersController.create.bind(bannersController));

bannersRouter.patch("/:id", bannersController.update.bind(bannersController));

export default bannersRouter;
