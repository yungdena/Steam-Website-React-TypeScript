import { Request, Response } from "express";

import { IApp } from "../types/app.type";
import AppsService from "../services/app.service";

export class AppsController {
  constructor(private appsService: AppsService) {}

  async create(req: Request, res: Response) {
    const app: IApp = req.body;

    await this.appsService.createApp({ app, res });
  }

  async getAll(req: Request, res: Response) {
    const apps = await this.appsService.getAllApps(res);
  }

  async getAllFromSteam(req: Request, res: Response) {
    const apps = await this.appsService.getAllAppsFromSteamAPI(res);
  }

  async getByTitle(req: Request, res: Response) {
    const appTitle = req.params.title;
    const app = await this.appsService.getAppByTitle(appTitle, res);
  }

  async getById(req: Request, res: Response) {
    const appId = req.params.id;
    const app = await this.appsService.getAppById(appId, res);
  }

  async update(req: Request, res: Response) {
    const app: IApp = req.body;
    const id = req.params.id;
    const updatedApp = await this.appsService.updateApp({ app, id, res });
  }
}

const appsController = new AppsController(new AppsService());
export default appsController;
