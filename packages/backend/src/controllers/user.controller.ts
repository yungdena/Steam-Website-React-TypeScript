import { Request, Response } from "express";

import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    await this.userService.getUserById(id, res);
  }

  async getUserByName(req: Request, res: Response) {
    const { name } = req.body;

    await this.userService.getUserByName(name, res);
  }

  async addToWishlist(req: Request, res: Response) {
    const { userId, appId } = req.body;

    await this.userService.addToWishlist(userId, appId, res);
  }

  async addToLibrary(req: Request, res: Response) {
    const { userId, appId } = req.body;

    await this.userService.addToLibrary(userId, appId, res);
  }

  async deleteFromWishlist(req: Request, res: Response) {
    const { userId, appId } = req.body;

    await this.userService.deleteFromWishlist(userId, appId, res);
  }

  async deleteFromLibrary(req: Request, res: Response) {
    const { userId, appId } = req.body;

    await this.userService.deleteFromLibrary(userId, appId, res);
  }

  async getWishlist(req: Request, res: Response) {
    const { id } = req.params;

    await this.userService.getWishlist(id, res);
  }

  async getLibrary(req: Request, res: Response) {
    const { id } = req.params;

    await this.userService.getLibrary(id, res);
  }
}

const userController = new UserController(new UserService());
export default userController;
