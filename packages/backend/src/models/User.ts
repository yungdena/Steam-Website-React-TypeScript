import { Document, Model, model, Schema } from 'mongoose';

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
    senderId: Schema.Types.ObjectId;
    receiverId: Schema.Types.ObjectId;
    status: "pending" | "accepted" | "declined";
  }>;
  sentFriendRequests: Array<{
    senderId: Schema.Types.ObjectId;
    receiverId: Schema.Types.ObjectId;
    status: "pending" | "accepted" | "declined";
  }>;
}

const userSchema: Schema<any, Model<IUser>> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  wishlist: [{ type: Schema.Types.ObjectId, ref: "App" }],
  apps: [{ type: Schema.Types.ObjectId, ref: "App" }],
  friends: {
    type: Array,
  },
  friendCode: {
    type: String,
    unique: true,
  },
  friendRequests: [
    {
      senderId: { type: Schema.Types.ObjectId, ref: "User" },
      receiverId: { type: Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["pending", "accepted", "declined"] },
    },
  ],
  sentFriendRequests: [
    {
      senderId: { type: Schema.Types.ObjectId, ref: "User" },
      receiverId: { type: Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["pending", "accepted", "declined"] },
    },
  ],
});

export const UserModel: Model<IUser> = model<IUser>('User', userSchema);
