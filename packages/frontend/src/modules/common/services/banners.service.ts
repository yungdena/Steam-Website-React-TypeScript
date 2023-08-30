import { useMutation } from "react-query";

const BASE_URL = import.meta.env.REACT_APP_API_URL;
console.log(process, "base url");

const getAllBanners = async () => {
  const response = await fetch(`${BASE_URL}/banners`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("GetAllBanners response", response);
  const responseData = await response.json();
  console.log("data", responseData);
  return responseData;
};

const getBannerById = async (bannerId: string) => {
  console.log("getBannerById", bannerId);
  const response = await fetch(`${BASE_URL}/banners/${bannerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("GetBannerById response", response);
  const responseData = await response.json();
  console.log("data by id", responseData);
  return responseData;
};

export const useGetAllBanners = () => useMutation(getAllBanners);
export const useGetBannerById = () => useMutation(getBannerById);
