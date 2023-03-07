import { useMutation } from 'react-query';
import { IApp } from '../types/app.interface';

const BASE_URL = 'https://steam-api.onrender.com/api/auth';
const DEV_URL = "http://localhost:4200/api";

const getAllApps = async () => {
  console.log('sign up service');
  const response = await fetch(`${DEV_URL}/apps`, {
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

export const useGetAllApps = () => useMutation(getAllApps)