import { Response } from "express";

import { AppModel, appSchema } from "../models/App";
import { IApp } from "../types/app.type";

interface ICreatePayload {
  app: IApp;
  res: Response;
}

interface IUpdatePayload {
  app: IApp;
  id: string;
  res: Response;
}

class AppsService {
  async getAllApps(res: Response, page: number = 1, pageSize: number = 10) {
    try {
      const totalAppsCount = await AppModel.countDocuments();

      const maxPages = Math.ceil(totalAppsCount / pageSize);

      if (page < 1 || page > maxPages) {
        return res.status(404).send({ message: "Invalid page number" });
      }

      const offset = (page - 1) * pageSize;
      const apps = await AppModel.find().skip(offset).limit(pageSize);

      res.send(apps);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async getAllDiscounts(res: Response) {
    try {
      const apps = await AppModel.find({ newPrice: { $exists: true } });

      res.send(apps);
    } catch (error) {
      console.error(error);

      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async getAppByTitle(title: string, res: Response) {
    const app = await AppModel.find({ title });

    if (!app) {
      res.status(404).send({ message: "cannot get app by title" });
      return;
    }

    res.send(app);
  }

  async getAppTitle(id: string, res: Response) {
    try {
      const app = await AppModel.findById(id);

      if (!app) {
        res.status(404).send({ message: "App not found" });
        return;
      }

      const title = app.title;

      res.send({ title });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async getAppsByTags(tags: string[], res: Response) {
    try {
      const apps = await AppModel.find({ tags: { $in: tags } });

      if (!apps || apps.length === 0) {
        res
          .status(404)
          .send({ message: "No apps found with the specified tags" });
        return;
      }

      res.send(apps);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async getAppById(id: string, res: Response) {
    const app = await AppModel.findById(id);

    if (!app) {
      res.status(404).send({ message: "cannot get app by id" });
      return;
    }

    res.send(app);
  }

  async createApp({ app, res }: ICreatePayload) {
    const createdApp = await AppModel.create(app);

    if (!createdApp) {
      res.status(400).send({ message: "Error while creating app" });
      return;
    }

    res.send(createdApp);
  }

  async updateApp({ app, res, id }: IUpdatePayload) {
    try {
      const updatedApp = await AppModel.findOneAndUpdate({ _id: id }, app, {
        new: true,
      });

      res.send(updatedApp);
    } catch (err) {
      console.error(err);
    }
  }
}

export default AppsService