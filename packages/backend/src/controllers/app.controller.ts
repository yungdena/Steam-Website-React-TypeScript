import { Request, Response } from "express";

import { IApp } from "../types/app.type";
import AppsService from "../services/app.service";

export class AppsController {
  constructor(private appsService: AppsService) {}

  async create(req: Request, res: Response) {
    const app: IApp = req.body;

    console.log('this', this)

    await this.appsService.createApp({ app, res });
  }

  async getAll(req: Request, res: Response) {
    const apps = await this.appsService.getAllApps(res);
  }

  async getById(req: Request, res: Response) {
    const appTitle = req.params.title;
    const app = await this.appsService.getAppByTitle(appTitle, res);
  }
}

const appsController = new AppsController(new AppsService());
export default appsController;
