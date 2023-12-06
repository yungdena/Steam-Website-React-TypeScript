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
    console.log('sender id', senderId)
    console.log("receiver id", receiverId);
    console.log("response", response);
    await this.friendsService.respondToFriendRequest(
      receiverId,
      senderId,
      response,
      res
    );
  }

  async removeFriend(req: Request, res: Response) {
    const { senderId, receiverId } = req.body;

    await this.friendsService.removeFriend(senderId, receiverId, res);
  }
}

const friendsController = new FriendsController(new FriendsService());
export default friendsController;
