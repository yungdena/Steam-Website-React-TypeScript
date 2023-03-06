import { Router } from "express";
import { tryCatchWrap } from "../../middlewares/try-catch.middleware";
import appsController from "../../controllers/app.controller";

const appsRouter: Router = Router();

appsRouter.get("/", appsController.getAll.bind(appsController));

appsRouter.get("/:id", appsController.getById.bind(appsController));

appsRouter.post("/", appsController.create.bind(appsController));

export default appsRouter