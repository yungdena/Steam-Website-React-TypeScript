import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { IApp } from "../types/app.interface";
import { BASE_URL } from "./base-url";

const getAllApps = async (page: number, pageSize: number) => {
  const response = await fetch(
    `${BASE_URL}/apps?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    }
  );

  if (!response.ok) {
    throw new Error('Not enough apps for this page :D')
  }

  const responseData = await response.json();
  return responseData;
};

const getAllDiscounts = async () => {
  const response = await fetch(`${BASE_URL}/apps/discounts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    throw new Error('Error');
  }

  const responseData = await response.json();
  return responseData;
};


const postApp = async (data: IApp) => {
  const response = await fetch(`${BASE_URL}/apps`, {
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

const updateApp = async ({
  data,
  appId,
}: {
  data: Partial<IApp>;
  appId: string;
}): Promise<any> => {
  const response = await fetch(`${BASE_URL}/apps/${appId}`, {
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

const getAppById = async (appId: string) => {
  const response = await fetch(`${BASE_URL}/apps/${appId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  const responseData = await response.json();
  return responseData;
};

const getAppTitle = async (appId: string) => {
  const response = await fetch(`${BASE_URL}/apps/title/${appId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  const responseData = await response.json();
  return responseData;
};

const getAppsByTags = async (tags: string[]) => {
  const response = await fetch(`${BASE_URL}/apps/tags/${tags}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  const responseData = await response.json();
  return responseData;
};

const getMaxPages = async () => {
  const response = await fetch(`${BASE_URL}/apps/max-pages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  const responseData = await response.json();
  return responseData;
};

const getAppsByTitle = async (title: string) => {
  const response = await fetch(`${BASE_URL}/apps/search/${title}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  const responseData = await response.json();
  return responseData;
};

const getAppsByPrice = async (price: string) => {
  const response = await fetch(`${BASE_URL}/apps/price/${price}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  const responseData = await response.json();
  return responseData;
};

const getFilteredApps = async (filters: any) => {
  const queryString = new URLSearchParams(filters).toString();
  const response = await fetch(`${BASE_URL}/apps/filtered?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  const responseData = await response.json();
  return responseData;
};


export const useGetAllApps = (page: number = 1, pageSize: number = 100) => {
  return useMutation(() => getAllApps(page, pageSize));
};
export const useGetDiscounts = () => useMutation(getAllDiscounts);
export const useGetAppsByTitle = () => useMutation(getAppsByTitle);
export const useGetAppsByPrice = () => useMutation(getAppsByPrice);
export const useGetMaxPages = () => useMutation(getMaxPages);
export const useGetFilteredApps = () => useMutation(getFilteredApps);
export const useGetAppById = () => useMutation(getAppById)
export const useGetTitle = () => useMutation(getAppTitle);
export const useGetAppsByTags = () => useMutation(getAppsByTags);
export const usePostApp = () => useMutation(postApp)
export const useUpdateApp = (): UseMutationResult<
  any,
  unknown,
  [Partial<IApp>, string]
> => {
  return useMutation<any, unknown, [Partial<IApp>, string]>(([appData, appId]) =>
    updateApp({ data: appData, appId })
  );
};