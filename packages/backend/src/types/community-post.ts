import { ObjectId } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  image: string;
  user: string;
  likes: number;
  comments: object;
  _id: ObjectId;
}
