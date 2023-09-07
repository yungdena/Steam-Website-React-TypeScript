import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "./base-url";

type addAppToUser = {
  userId: string,
  appId: string
};

const addToLibrary = async (data: addAppToUser) => {
  console.log('mutation start')
  const response = await fetch(`${BASE_URL}/user/library`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("mutation response", response);
  const responseData = await response.json();
  console.log("mutation response Json", responseData);
  return responseData;
};

const addToWishlist = async (data: addAppToUser) => {
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

export const useAddToLibrary = () => useMutation(addToLibrary);
export const useAddToWishlist = () => useMutation(addToWishlist);
