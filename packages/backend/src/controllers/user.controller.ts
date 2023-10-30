import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    await this.userService.getUserById(id, res);
  }

  async getUserByFriendCode(req: Request, res: Response) {
    const { friendcode } = req.params;

    await this.userService.getUserByFriendCode(friendcode, res);
  }

  async getUserByName(req: Request, res: Response) {
    const { name } = req.params;

    await this.userService.getUserByName(name, res);
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updatedFields = req.body;

    await this.userService.updateUser(id, updatedFields, res);
  }

  async updateAvatar(req: Request, res: Response) {
    const { id } = req.params;

    console.log('controller check')

    if (!req.file) {
      return res.status(400).json({ message: "No avatar file uploaded" });
    }

    const avatarFile = req.file;

    try {
      await this.userService.updateAvatar(id, avatarFile.path, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const userController = new UserController(new UserService());
export default userController;
