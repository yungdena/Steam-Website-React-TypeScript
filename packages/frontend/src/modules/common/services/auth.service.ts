import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "./base-url";

type SignUpFormValues = {
  name: string;
  email: string;
  country: string;
  password: string;
};

type SignInFormValues = {
  name: string;
  password: string;
};

const signUp = async (data: SignUpFormValues) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const responseData = await response.json();

  return responseData;
};

const signIn = async (data: SignInFormValues) => {
  const response = await fetch(`${BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const responseData = await response.json();
  return responseData;
};

export const useSignUp = () => useMutation(signUp);
export const useSignIn = () => useMutation(signIn);
