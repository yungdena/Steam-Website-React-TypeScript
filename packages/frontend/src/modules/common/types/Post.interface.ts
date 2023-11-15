interface ILike {
  count: number;
  users: string[];
}

export interface IComment {
  user: string;
  text: string;
}

export interface IPost extends Document {
  title: string;
  description: string;
  image: string;
  user: string;
  likes: ILike;
  comments: IComment[];
  _id: string;
}
