import { Response } from "express";
import { AppModel } from "../models/App";
import { IApp } from "../types/app.type";

const API_URL = "http://localhost:4200/api/apps";

interface ICreatePayload {
  app: IApp;
  res: Response;
}

class AppsService {
  async getAllApps(res: Response) {
    const apps = await AppModel.find();

    if (!apps) {
      res.status(404).send({ message: "cannot get all apps" });
      return;
    }

    console.log("getAllApps Service: ", apps);
    res.send(apps);
  }

  async getAppByTitle(title: string, res: Response) {
    const app = await AppModel.find({ title });

    if(!app) {
      res.status(404).send({ message: "cannot get app by title" });
      return;
    }

    console.log("getAppByTitle Service: ", app);
    res.send(app);
  }

  async createApp({ app, res }: ICreatePayload) {
    const createdApp = await AppModel.create({ app })

    if (!createdApp) {
      res.status(400).send({ message: "Error while creating app" });
      return;
    }

    console.log("createdApp: ", createdApp)

    res.send(createdApp);
  }
}

export default AppsService