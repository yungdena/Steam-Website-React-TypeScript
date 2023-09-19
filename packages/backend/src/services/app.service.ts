import { Response } from "express";

import { AppModel } from "../models/App";
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
  async getAllApps(res: Response) {
    const apps = await AppModel.find();

    if (!apps) {
      res.status(404).send({ message: "cannot get all apps" });
      return;
    }

    res.send(apps);
  }

  async getAppByTitle(title: string, res: Response) {
    const app = await AppModel.find({ title });

    if (!app) {
      res.status(404).send({ message: "cannot get app by title" });
      return;
    }

    res.send(app);
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