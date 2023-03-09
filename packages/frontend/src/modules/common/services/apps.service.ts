import { useMutation } from 'react-query';
import { IApp } from '../types/app.interface';

const BASE_URL = 'https://steam-api.onrender.com/api/';
const DEV_URL = "http://localhost:4200/api";

const getAllApps = async () => {
  const response = await fetch(`${BASE_URL}/apps`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  console.log('GetAllApps response', response);
  const responseData = await response.json();
  console.log('data', responseData);
  return responseData;
};

const getAppById = async (appId: string) => {
  console.log('getAppById', appId);
  const response = await fetch(`${BASE_URL}/apps/${appId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("GetAppById response", response);
  const responseData = await response.json();
  console.log("data by id", responseData);
  return responseData;
};

export const useGetAllApps = () => useMutation(getAllApps)
export const useGetAppById = () => useMutation(getAppById)