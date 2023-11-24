import { Router } from "express";
import { appSchema, isExist, validate } from "../../middlewares/validate.middleware";
import appsController from "../../controllers/app.controller";
import { AppModel } from "../../models/App";
import { Request, Response } from "express-serve-static-core";

const appsRouter: Router = Router();

appsRouter.get("/", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
  appsController.getAll(req, res, page, pageSize);
});

appsRouter.get("/max-pages", async (req, res) => {
  try {
    const totalCount = await AppModel.countDocuments();
    const pageSize = 20;
    const maxPages = Math.ceil(totalCount / pageSize);
    res.json({ maxPages });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

appsRouter.get(
  "/discounts",
  appsController.getAllDiscounts.bind(appsController)
);

appsRouter.get("/:id", isExist(AppModel), appsController.getById.bind(appsController));

appsRouter.get(
  "/title/:id",
  appsController.getTitle.bind(appsController)
);

appsRouter.get("/tags/:tags", appsController.getByTags.bind(appsController));

appsRouter.post("/", validate(appSchema), appsController.create.bind(appsController));

appsRouter.patch(
  "/:id",
  isExist(AppModel),
  appsController.update.bind(appsController)
);


export default appsRouter