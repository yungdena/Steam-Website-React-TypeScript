import { Response } from "express";
import { FilterQuery } from "mongoose";

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
    try {
      const regex = new RegExp(title, "i");
      const apps = await AppModel.find({ title: { $regex: regex } });

      if (!apps || apps.length === 0) {
        res.status(404).send({ message: "No apps found by title" });
        return;
      }

      res.send(apps);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
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

  async getAppById(id: string, res: Response) {
    const app = await AppModel.findById(id);

    if (!app) {
      res.status(404).send({ message: "cannot get app by id" });
      return;
    }

    res.send(app);
  }

  async getFilteredApps(filters: Record<string, any>, res: Response) {
    try {
      type TransformedFilters = Record<string, any>;
      console.log(filters);
      const transformedFilters: TransformedFilters = Object.entries(
        filters
      ).reduce((acc: any, [key, value]) => {
        if (key === "price") {
          if (value === "Free") {
            acc["price"] = "Free to Play";
          } else {
            const numericPrice = parseFloat(value);
            if (filters.specialOffers === "true") {
              acc["$and"] = [
                { $expr: { $lt: [{ $toDecimal: "$newPrice" }, numericPrice] } },
              ];
            } else {
              if (!acc["$or"]) {
                acc["$or"] = [];
              }
              acc["$or"].push(
                { price: "Free to Play" },
                { $expr: { $lt: [{ $toDecimal: "$price" }, numericPrice] } },
                {
                  $and: [
                    { newPrice: { $exists: true } },
                    {
                      $expr: {
                        $lt: [{ $toDecimal: "$newPrice" }, numericPrice],
                      },
                    },
                  ],
                }
              );
            }
          }
        } else if (key === "title") {
          const regex = new RegExp(value, "i");
          acc["title"] = { $regex: regex };
        } else if (key === "hideFree" && value === "true") {
          acc["price"] = { $ne: "Free to Play" };
        } else if (key === "specialOffers" && value === "true") {
          acc["$or"] = [{ newPrice: { $exists: true } }];
        } else if (key === "tags") {
          const tagsArray = Array.isArray(value) ? value : value.split(",");
          acc[key] = { $in: tagsArray };
        } else {
          acc[key] = Array.isArray(value) ? { $in: value } : value;
        }

        return acc;
      }, {});

      const filteredApps = await AppModel.find(transformedFilters);

      if (!filteredApps || filteredApps.length === 0) {
        res.status(404).send({ message: "No apps found based on the filters" });
        return;
      }

      res.send(filteredApps);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
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