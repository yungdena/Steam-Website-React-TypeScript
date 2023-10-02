import { Request, Response } from "express";
import { FriendsService } from "../services/friends.service";

export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  async sendFriendRequest(req: Request, res: Response) {
    const { senderId, receiverId } = req.body;

    await this.friendsService.sendFriendRequest(senderId, receiverId, res);
  }

  async respondToFriendRequest(req: Request, res: Response) {
    const { senderId, receiverId, response } = req.body;
    console.log("Controller: ", senderId, receiverId, response);
    await this.friendsService.respondToFriendRequest(
      senderId,
      receiverId,
      response,
      res
    );
  }

  async removeFriend(req: Request, res: Response) {
    const { userId, friendId } = req.body;

    await this.friendsService.removeFriend(userId, friendId, res);
  }
}

const friendsController = new FriendsController(new FriendsService());
export default friendsController;
