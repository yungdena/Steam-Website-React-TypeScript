import { CommunityPostModel } from "../models/Community-post";
import { IPost } from "../types/community-post";
import { Response } from "express-serve-static-core";

export class CommunityPostService {
  async createPost(postData: IPost) {
    const createdPost = await CommunityPostModel.create(postData);
    return createdPost;
  }

  async updatePost(postData: IPost, userId: string) {
    try {
      const post = await CommunityPostModel.findById(postData._id);

      if (!post) {
        throw new Error("Post not found");
      }

      if (userId !== post.user) {
        throw new Error("You are not authorized to update this post");
      }

      if (postData.user !== userId) {
        throw new Error("You can only update your own posts");
      }

      if (postData.title) {
        post.title = postData.title;
      }
      if (postData.description) {
        post.description = postData.description;
      }
      if (postData.image) {
        post.image = postData.image;
      }
      if (postData.likes !== undefined) {
        post.likes = postData.likes;
      }
      if (postData.comments) {
        post.comments = postData.comments;
      }

      const updatedPost = await post.save();

      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId: string, userId: string) {
    try {
      const post = await CommunityPostModel.findById(postId);

      if (!post) {
        throw new Error("Post not found");
      }

      if (userId !== post.user) {
        throw new Error("You are not authorized to delete this post");
      }

      await post.remove();

      return "Post deleted successfully";
    } catch (error) {
      throw error;
    }
  }
}
