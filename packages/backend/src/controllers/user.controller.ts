import { Request, Response } from "express";

import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    await this.userService.getUserById(id, res);
  }

  async getUserByFriendCode(req: Request, res: Response) {
    const { friendcode } = req.params;
    console.log("friendCode: ", friendcode);
    await this.userService.getUserByFriendCode(friendcode, res);
  }

  async getUserByName(req: Request, res: Response) {
    const { name } = req.params;

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

  async sendFriendRequest(req: Request, res: Response) {
    const { senderId, receiverId } = req.body;

    await this.userService.sendFriendRequest(senderId, receiverId, res);
  }

  async respondToFriendRequest(req: Request, res: Response) {
    const { senderId, receiverId, response } = req.body;
    console.log('Controller: ', senderId, receiverId, response);
    await this.userService.respondToFriendRequest(
      senderId,
      receiverId,
      response,
      res
    );
  }

  async removeFriend(req: Request, res: Response) {
    const { userId, friendId } = req.body;

    await this.userService.removeFriend(userId, friendId, res);
  }
}

const userController = new UserController(new UserService());
export default userController;
