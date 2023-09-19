import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "./base-url";

type IBody = {
  userId: string,
  appId: string
};

const addToLibrary = async (data: IBody) => {
  const response = await fetch(`${BASE_URL}/user/library`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData;
};

const deleteFromLibrary = async (data: IBody) => {
  console.log("mutation start");
  const response = await fetch(`${BASE_URL}/user/library`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("mutation response", response);
  const responseData = await response.json();
  console.log("User's delete from library mutation", responseData);
  return responseData;
};

const deleteFromWishlist = async (data: IBody) => {
  const response = await fetch(`${BASE_URL}/user/wishlist`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData;
};

const getUserById = async (userId: string) => {
  console.log("mutation start");
  const response = await fetch(`${BASE_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  console.log("get user by id mutation: ", responseData);
  return responseData;
};

export const useAddToLibrary = () => useMutation(addToLibrary);
export const useAddToWishlist = () => useMutation(addToWishlist);
export const useDeleteFromLibrary = () => useMutation(deleteFromLibrary);
export const useDeleteFromWishlist = () => useMutation(deleteFromWishlist);
export const useGetUserById = () => useMutation(getUserById);