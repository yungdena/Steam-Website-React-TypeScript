import { Response } from "express";

import { BannerModel } from "../models/Banner";
import { IBanner } from "../types/banner-type";

interface ICreatePayload {
  banner: IBanner;
  res: Response;
}

interface IUpdatePayload {
  banner: IBanner;
  id: string;
  res: Response;
}

class BannersService {
  async getAllBanners(res: Response) {
    const banners = await BannerModel.find();

    if (!banners) {
      res.status(404).send({ message: "cannot get all banners" });
      return;
    }

    res.send(banners);
  }

  async getBannerById(id: string, res: Response) {
    const banner = await BannerModel.findById(id);

    if (!banner) {
      res.status(404).send({ message: "cannot get banner by id" });
      return;
    }

    res.send(banner);
  }

  async createBanner({ banner, res }: ICreatePayload) {
    const createdBanner = await BannerModel.create(banner);

    if (!createdBanner) {
      res.status(400).send({ message: "Error while creating banner" });
      return;
    }

    res.send(createdBanner);
  }

  async updateBanner({ banner, res, id }: IUpdatePayload) {
    try {
      const updatedBanner = await BannerModel.findOneAndUpdate({ _id: id }, banner, {
        new: true,
      });

      res.send(updatedBanner);
    } catch (err) {
      console.error(err);
    }
  }
}

export default BannersService;
