import { useMutation } from "@tanstack/react-query";
import { IUser } from "../types/User";
import { BASE_URL } from "./base-url";

type IBody = {
  userId: string,
  appId: string
};

const getLibrary = async (id: string) => {
  const response = await fetch(`${BASE_URL}/user/library/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const responseData = await response.json();
  return responseData;
};

const getWishlist = async (id: string) => {
  const response = await fetch(`${BASE_URL}/user/wishlist/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const responseData = await response.json();
  return responseData;
};


const addToLibrary = async (data: IBody) => {
  const response = await fetch(`${BASE_URL}/user/library`, {
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

const addToWishlist = async (data: IBody) => {
  const response = await fetch(`${BASE_URL}/user/wishlist`, {
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

const deleteFromLibrary = async (data: IBody) => {
  const response = await fetch(`${BASE_URL}/user/library`, {
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

const deleteFromWishlist = async (data: IBody) => {
  const response = await fetch(`${BASE_URL}/user/wishlist`, {
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

const getUserById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/user/id/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const responseData = await response.json();
  return responseData;
};

const getUserByName = async (name: string) => {
  const response = await fetch(`${BASE_URL}/user/name/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const responseData = await response.json();
  return responseData;
};

const getUserByFriendCode = async (friendCode: string) => {
  const response = await fetch(`${BASE_URL}/user/friendcode/${friendCode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const responseData = await response.json();
  return responseData;
};

interface IFriendRequest {
  senderId: string;
  receiverId: string;
}

const sendFriendRequest = async (data: IFriendRequest) => {
  const response = await fetch(`${BASE_URL}/user/send-friend-request`, {
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

interface IFriendRespond {
  receiverId: string;
  senderId: string;
  response: string;
}

const respondToFriendRequest = async (data: IFriendRespond) => {
  const response = await fetch(`${BASE_URL}/user/respond-to-friend-request`, {
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

interface IFriendRemove {
  senderId: string;
  receiverId: string;
}

const removeFriend = async (data: IFriendRemove) => {
  const response = await fetch(`${BASE_URL}/user/remove-friend`, {
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

const updateUser = async (data: IUser) => {
  const response = await fetch(`${BASE_URL}/user/update/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData;
}

export const useRemoveFriend = () => useMutation(removeFriend);
export const useRespondToFriendRequest = () => useMutation(respondToFriendRequest);
export const useSendFriendRequest = () => useMutation(sendFriendRequest);
export const useGetLibrary = () => useMutation(getLibrary);
export const useGetWishlist = () => useMutation(getWishlist);
export const useAddToLibrary = () => useMutation(addToLibrary);
export const useAddToWishlist = () => useMutation(addToWishlist);
export const useDeleteFromLibrary = () => useMutation(deleteFromLibrary);
export const useDeleteFromWishlist = () => useMutation(deleteFromWishlist);
export const useGetUserById = () => useMutation(getUserById);
export const useGetUserByName = () => useMutation(getUserByName);
export const useGetUserByFriendCode = () => useMutation(getUserByFriendCode);
export const useUpdateUser = () => useMutation(updateUser);