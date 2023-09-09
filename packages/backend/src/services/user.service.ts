import { Response } from "express";
import { User } from "../models/User";

export class UserService {
  async addToWishlist(userId: string, appId: string, res: Response) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      if (user.wishlist.includes(appId)) {
        res.status(400).send({ message: "App is already in the wishlist" });
        return;
      }

      user.wishlist.push(appId);
      await user.save();

      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  async addToLibrary(userId: string, appId: string, res: Response) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      user.apps = user.apps.filter((app) => app !== appId);
      user.apps.push(appId);
      await user.save();

      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
  async getWishlist(userId: string, res: Response) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      res.send({ wishlist: user.wishlist });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  async getLibrary(userId: string, res: Response) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      res.send({ library: user.apps });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
}
