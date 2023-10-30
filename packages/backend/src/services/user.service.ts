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

  async updateUser(
    userId: string,
    updatedFields: Record<string, any>,
    res: Response
  ) {
    try {
      const user = await UserModel.findById(userId);
      console.log("user: ", user);
      console.log("updatedFields: ", updatedFields);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      for (const key in updatedFields) {
        if (Object.prototype.hasOwnProperty.call(updatedFields, key)) {
          (user as any)[key] = updatedFields[key];
        }
      }

      await user.save();

      const { password, ...userWithoutPassword } = user.toObject();
      res.send(userWithoutPassword);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
}
