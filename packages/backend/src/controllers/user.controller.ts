import { Request, Response } from "express";

import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async addToWishlist(req: Request, res: Response) {
    const { userId, appId } = req.body;

    await this.userService.addToWishlist(userId, appId, res);
  }

  async addToLibrary(req: Request, res: Response) {
    const { userId, appId } = req.body;

    await this.userService.addToLibrary(userId, appId, res);
  }
}

const userController = new UserController(new UserService());
export default userController;
