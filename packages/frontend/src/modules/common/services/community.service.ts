import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IPost } from "../types/Post.interface";
import { BASE_URL } from "./base-url";

const getAllPosts = async () => {
  const response = await fetch(`${BASE_URL}/community/post`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData;
};

const getPostById = async (postId: string) => {
  const response = await fetch(`${BASE_URL}/community/post/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  return responseData;
};

const createPost = async (data: IPost) => {
  const response = await fetch(`${BASE_URL}/community/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  return responseData;
};

const updatePost = async ({
  data,
  postId,
}: {
  data: Partial<IPost>;
  postId: string;
}): Promise<any> => {
  const response = await fetch(`${BASE_URL}/community/post/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  return responseData;
};

const deletePost = async (postId: string) => {
  const response = await fetch(`${BASE_URL}/community/post/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  return responseData;
};

export const useGetAllPosts = () => useMutation(getAllPosts);
export const useGetPostById = () => useMutation(getPostById);
export const useCreatePost = () => useMutation(createPost);
export const useUpdatePost = () => useMutation(updatePost);
export const useDeletePost = () => useMutation(deletePost);