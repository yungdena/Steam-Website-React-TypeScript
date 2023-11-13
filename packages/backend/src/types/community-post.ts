import { ObjectId } from "mongoose";

interface ILike {
  count: number,
  users: string[]
}

export interface IPost extends Document {
  title: string;
  description: string;
  image: string;
  user: string;
  likes: ILike;
  comments: object;
  _id: ObjectId;
}
