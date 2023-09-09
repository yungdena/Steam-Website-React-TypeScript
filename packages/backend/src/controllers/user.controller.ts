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

  async getWishlist(req: Request, res: Response) {
    const { id } = req.params;
    console.log("userId", id);
    await this.userService.getWishlist(id, res);
  }

  async getLibrary(req: Request, res: Response) {
    const { userId } = req.params;

    await this.userService.getLibrary(userId, res);
  }
}

const userController = new UserController(new UserService());
export default userController;
