import { Router } from "express";
import { tryCatchWrap } from "../../middlewares/try-catch.middleware";
import appsController from "../../controllers/app.controller";

const appsRouter: Router = Router();

appsRouter.get("/", appsController.getAll);

appsRouter.get("/:id", appsController.getById);

appsRouter.post("/", appsController.create);

export default appsRouter