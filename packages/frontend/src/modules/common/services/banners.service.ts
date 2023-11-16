import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "./base-url";

const getAllBanners = async () => {
  const response = await fetch(`${BASE_URL}/banners`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const responseData = await response.json();
  return responseData;
};

const getBannerById = async (bannerId: string) => {
  const response = await fetch(`${BASE_URL}/banners/${bannerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  const responseData = await response.json();
  return responseData;
};

export const useGetAllBanners = () => useMutation(getAllBanners);
export const useGetBannerById = () => useMutation(getBannerById);
