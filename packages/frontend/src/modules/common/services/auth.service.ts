import { useMutation } from "@tanstack/react-query";

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

const BASE_URL = "http://localhost:4200/api/auth";

const signUp = async (data: SignUpFormValues) => {
  console.log('sign up service');
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  console.log('sign up res', response);
  const responseData = await response.json();

  return responseData;
};

const signIn = async (data: SignInFormValues) => {
  console.log('sign in service');
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  console.log('sign in service res', response);
  const responseData = await response.json();
  console.log('res data', responseData);
  return responseData;
};

export const useSignUp = () => useMutation(signUp);
export const useSignIn = () => useMutation(signIn);
