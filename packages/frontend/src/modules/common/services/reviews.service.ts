import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IReview } from "../types/app.interface";
import { BASE_URL } from "./base-url";

interface IReviewPostRequest {
  appId: string;
  userId: string;
  reviewData: Partial<IReview>
}

const postReview = async (data: IReviewPostRequest) => {
  const response = await fetch(`${BASE_URL}/reviews`, {
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

interface IReviewPatchRequest {
  appId: string;
  userId: string;
  reviewId: string;
  updatedReviewData: Partial<IReview>
}

const updateReview = async (data: IReviewPatchRequest) => {
  const response = await fetch(`${BASE_URL}/reviews`, {
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

interface IReviewDeleteRequest {
  appId: string;
  userId: string;
  reviewId: string;
}

const deleteReview = async (data: IReviewDeleteRequest) => {
  const response = await fetch(`${BASE_URL}/reviews`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  return responseData;
};

export const usePostReview = () => useMutation(postReview);
export const useUpdateReview = () => useMutation(updateReview);
export const useDeleteReview = () => useMutation(deleteReview);