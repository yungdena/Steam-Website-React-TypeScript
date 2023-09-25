import { Response } from "express";
import { UserModel } from "../models/User";

export class UserService {
  async getUserById(userId: string, res: Response) {
    try {
      const user = await UserModel.findById(userId);

      if (user) {
        const { password, ...userWithoutPassword } = user.toObject();

        res.send(userWithoutPassword);
      } else {
        res.status(404).send({ message: "User not found" });
      }

    } catch (error) {
      res.status(404).send({ message: "User not found" });
    }
  }

  async getUserByFriendCode(friendCode: string, res: Response) {
    console.log("friendCode: ", friendCode);
    try {
      const user = await UserModel.findOne({ friendCode });

      if (user) {
        const { password, ...userWithoutPassword } = user.toObject();

        res.send(userWithoutPassword);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      console.log("friendCode: ", error);
      res.status(404).send({ message: "User not found" });
    }
  }

  async getUserByName(name: string, res: Response) {
    try {
      const users = await UserModel.find({
        name: { $regex: new RegExp(name, "ig") },
      });

      const usersWithoutPassword = users.map((user) => {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
      });

      res.send(usersWithoutPassword);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
  async addToWishlist(userId: string, appId: string, res: Response) {
    try {
      const user = await UserModel.findById(userId);
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
      const user = await UserModel.findById(userId);
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

  async deleteFromWishlist(userId: string, appId: string, res: Response) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      if (!user.wishlist.includes(appId)) {
        res.status(400).send({ message: "This app is not in wishlist" });
        return;
      }

      user.wishlist = user.wishlist.filter((id) => id !== appId);
      await user.save();

      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  async deleteFromLibrary(userId: string, appId: string, res: Response) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      if (!user.apps.includes(appId)) {
        res.status(400).send({ message: "This app is not in library" });
        return;
      }

      user.apps = user.apps.filter((id) => id !== appId);
      await user.save();

      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  async getWishlist(userId: string, res: Response) {
    try {
      const user = await UserModel.findById(userId);
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
      const user = await UserModel.findById(userId);
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
