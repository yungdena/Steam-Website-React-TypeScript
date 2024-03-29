import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IPost } from "../types/Post.interface";
import { BASE_URL } from "./base-url";

const getAllPosts = async () => {
  const response = await fetch(`${BASE_URL}/community/post`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
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
      "ngrok-skip-browser-warning": "true",
    },
  });

  const responseData = await response.json();
  return responseData;
};

const createPost = async (data: any) => {
  const response = await fetch(`${BASE_URL}/community/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
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
      "ngrok-skip-browser-warning": "true",
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
      "ngrok-skip-browser-warning": "true",
    },
  });

  const responseData = await response.json();
  return responseData;
};

const addLikeToPost = async (data: any): Promise<IPost | undefined> => {
  const response = await fetch(`${BASE_URL}/community/post/${data.postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (response.ok) {
    const postData: IPost = await response.json();
    postData.likes.count += 1;
    postData.likes.users.push(data.userId)

    const updateResponse = await fetch(
      `${BASE_URL}/community/post/${data.postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ postData }),
      }
    );

    if (updateResponse.ok) {
      return postData;
    }
  }

  return undefined;
};

const addCommentToPost = async (data: any): Promise<IPost | undefined> => {
  const response = await fetch(`${BASE_URL}/community/post/${data.postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (response.ok) {
    const postData: IPost = await response.json();
    postData.comments.push({
      user: data.userId,
      text: data.text
    })

    const updateResponse = await fetch(
      `${BASE_URL}/community/post/${data.postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ postData }),
      }
    );

    if (updateResponse.ok) {
      return postData;
    }
  }

  return undefined;
};

export const useGetAllPosts = () => useMutation(getAllPosts);
export const useGetPostById = () => useMutation(getPostById);
export const useCreatePost = () => useMutation(createPost);
export const useUpdatePost = () => useMutation(updatePost);
export const useDeletePost = () => useMutation(deletePost);
export const useAddLikeToPost = () => useMutation(addLikeToPost)
export const useAddCommentToPost = () => useMutation(addCommentToPost);