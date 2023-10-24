export interface IUser extends Document {
  avatar?: string;
  name: string;
  email: string;
  password: string;
  country: string;
  wishlist: string[];
  apps: string[];
  friends: string[];
  friendCode: string;
  friendRequests: Array<{
    senderId: string;
    status: "pending" | "accepted" | "declined";
  }>;
  sentFriendRequests: Array<{
    receiverId: string;
    status: "pending" | "accepted" | "declined";
  }>;
  _id: string;
}
