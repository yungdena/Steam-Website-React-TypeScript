import { Request, Response } from "express";

import { IBanner } from "../types/banner-type";
import BannersService from "../services/banner.service";

export class BannersController {
  constructor(private bannersService: BannersService) {}

  async create(req: Request, res: Response) {
    const banner: IBanner = req.body;
    console.log('controller', banner)
    await this.bannersService.createBanner({ banner, res });
  }

  async getAll(req: Request, res: Response) {
    const banners = await this.bannersService.getAllBanners(res);
  }

  async getById(req: Request, res: Response) {
    const bannerId = req.params.id;
    const banner = await this.bannersService.getBannerById(bannerId, res);
  }

  async update(req: Request, res: Response) {
    const banner: IBanner = req.body;
    const id = req.params.id;
    const updatedBanner = await this.bannersService.updateBanner({ banner, id, res });
  }
}

const bannersController = new BannersController(new BannersService());
export default bannersController;
