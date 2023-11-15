import { ObjectId } from "mongoose";

interface ILike {
  count: number,
  users: string[]
}

interface IComment {
  user: string,
  text: string
}

export interface IPost extends Document {
  title: string;
  description: string;
  image: string;
  user: string;
  likes: ILike;
  comments: IComment[];
  _id: ObjectId;
}
