import { Request, Response } from "express";

import { IApp } from "../types/app.type";
import { AppModel } from "../models/App";
import { AppsService } from "../services/app.service";

export class AppsController {
  constructor(private appsService: AppsService) {}

  async create(req: Request, res: Response) {
    const appData: IApp = req.body;
    await this.appsService.createApp(appData);
    res.sendStatus(201);
  }

  async getAll(req: Request, res: Response) {
    const apps = await this.appsService.getAllApps();
    res.json(apps);
  }

  async getById(req: Request, res: Response) {
    const appTitle = req.params.title;
    const app = await this.appsService.getAppByTitle(appTitle);
    if (app) {
      res.json(app);
    } else {
      res.sendStatus(404);
    }
  }

  async delete(req: Request, res: Response) {
    const appId = req.params.id;
    const result = await this.appsService.deleteApp(appId);
    if (result.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
}
const appsController = new AppsController(new AppsService());
export default appsController;
