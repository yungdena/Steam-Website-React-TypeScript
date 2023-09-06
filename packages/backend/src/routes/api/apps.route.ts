import { Router } from "express";
import { appSchema, isExist, validate } from "../../middlewares/validate.middleware";
import appsController from "../../controllers/app.controller";
import { AppModel } from "../../models/App";

const appsRouter: Router = Router();

appsRouter.get("/", appsController.getAll.bind(appsController));

appsRouter.get("/:id", isExist(AppModel), appsController.getById.bind(appsController));

appsRouter.post("/", validate(appSchema), appsController.create.bind(appsController));

appsRouter.patch(
  "/:id",
  isExist(AppModel),
  appsController.update.bind(appsController)
);

export default appsRouter