import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IApp } from "../types/app.interface";
import { BASE_URL } from "./base-url";

const getAllApps = async (page: number, pageSize: number) => {
  const response = await fetch(
    `${BASE_URL}/apps?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
  const response = await fetch(
    `${BASE_URL}/apps/discounts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

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
    },
  });

  const responseData = await response.json();
  return responseData;
};

export const useGetAllApps = (page: number = 1, pageSize: number = 10) => {
  return useMutation(() => getAllApps(page, pageSize));
};
export const useGetDiscounts = () => useMutation(getAllDiscounts);
export const useGetAppById = () => useMutation(getAppById)
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