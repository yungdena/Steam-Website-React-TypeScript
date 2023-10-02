import { Response } from "express";
import { ObjectId } from "mongoose";
import { UserModel } from "../models/User";

export class FriendsService {
  async sendFriendRequest(
      senderId: ObjectId,
      receiverId: ObjectId,
      res: Response
    ) {
      try {
        const sender = await UserModel.findById(senderId);
        const receiver = await UserModel.findById(receiverId);
  
        if (!sender || !receiver) {
          res
            .status(404)
            .send({ success: false, message: "Sender or receiver not found" });
          return;
        }
  
        const existingRequestFromSender = receiver.friendRequests.find(
          (request) =>
            request.senderId.toString() === senderId.toString() &&
            request.status === "pending"
        );
  
        const existingRequestFromReceiver = sender.sentFriendRequests.find(
          (request) =>
            request.receiverId &&
            request.receiverId.toString() === receiverId.toString() &&
            request.status === "pending"
        );
  
        if (existingRequestFromSender || existingRequestFromReceiver) {
          res
            .status(400)
            .send({ success: false, message: "Friend request already sent" });
          return;
        }
  
        sender.sentFriendRequests.push({ senderId, receiverId, status: "pending" });
        receiver.friendRequests.push({ senderId, receiverId, status: "pending" });
  
        await sender.save();
        await receiver.save();
  
        res.status(200).send({ success: true, message: "Friend request sent" });
      } catch (error) {
        console.error("Error sending friend request:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    }
  
    async respondToFriendRequest(
      senderId: ObjectId,
      receiverId: ObjectId,
      response: string,
      res: Response
    ) {
      try {
        const receiver = await UserModel.findById(receiverId);
        const sender = await UserModel.findById(senderId);
  
        if (!receiver || !sender) {
          res
            .status(404)
            .send({ success: false, message: "Receiver or sender not found" });
          return;
        }
  
        const friendRequestFromSender = receiver.friendRequests.find(
          (request) =>
            request.senderId.toString() === senderId.toString() &&
            request.status === "pending"
        );
  
        const friendRequestFromReceiver = sender.sentFriendRequests.find(
          (request) =>
            request.receiverId &&
            request.receiverId.toString() === receiverId.toString() &&
            request.status === "pending"
        );
  
        if (!friendRequestFromSender || !friendRequestFromReceiver) {
          res
            .status(400)
            .send({ success: false, message: "Friend request not found" });
          return;
        }
  
        if (
          friendRequestFromSender.status === "accepted" ||
          friendRequestFromReceiver.status === "accepted"
        ) {
          res
            .status(400)
            .send({ success: false, message: "Friend request already accepted" });
          return;
        }
  
        if (response === "accepted" || response === "declined") {
          sender.sentFriendRequests = sender.sentFriendRequests.filter(
            (request) => {
              if (
                request.receiverId &&
                request.receiverId.toString() === receiverId.toString() &&
                (request.status === "pending" ||
                  request === friendRequestFromReceiver)
              ) {
                if (request.status === "accepted") {
                  receiver.friends.push(senderId.toString());
                  sender.friends.push(receiverId.toString());
                }
                return false;
              }
              return true;
            }
          );
  
          receiver.friendRequests = receiver.friendRequests.filter((request) => {
            if (
              request.senderId &&
              request.senderId.toString() === senderId.toString() &&
              (request.status === "pending" ||
                (request.status === "accepted" &&
                  request === friendRequestFromSender))
            ) {
              request.status = "accepted";
              if (request.status === "accepted") {
                receiver.friends.push(senderId.toString());
                sender.friends.push(receiverId.toString());
              }
              return false;
            }
            return true;
          });
  
          await sender.save();
        } else {
          res
            .status(400)
            .send({ success: false, message: "Invalid response status" });
          return;
        }
  
        await receiver.save();
  
        res
          .status(200)
          .send({ success: true, message: "Friend request responded" });
      } catch (error) {
        console.error("Error responding to friend request:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    }
  
    async removeFriend(userId: string, friendId: string, res: Response) {
      try {
        const user = await UserModel.findById(userId);
        const friend = await UserModel.findById(friendId);
  
        if (!user || !friend) {
          res.status(404).send({ message: "User or friend not found" });
          return;
        }
  
        if (
          !user.friends.includes(friendId) ||
          !friend.friends.includes(userId)
        ) {
          res.status(400).send({ message: "Friend not found in user's friends" });
          return;
        }
  
        user.friends = user.friends.filter((id) => id !== friendId);
  
        friend.friends = friend.friends.filter((id) => id !== userId);
  
        await user.save();
        await friend.save();
  
        res.send(user);
      } catch (error) {
        res.status(500).send({ message: "Internal server error" });
      }
    }
}