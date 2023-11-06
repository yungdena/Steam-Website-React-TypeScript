import { Model, model, Schema } from "mongoose";
import { IPost } from "../types/community-post";

export const communityPostSchema: Schema<IPost> = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  likes: {
    type: Number,
    required: true,
  },
  comments: {
    type: Object,
    required: true,
  },
  user: {
    type: String,
    required: true,
  }
});

export const CommunityPostModel: Model<IPost> = model("CommunityPost", communityPostSchema);
