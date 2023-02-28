import * as Yup from 'yup';
import { AUTH_ERRORS } from '../consts/authInfo';

const {
  SHORT_NAME,
  SHORT_PASSWORD,
  REQUIRED_EMAIL,
  REQUIRED_NAME,
  REQUIRED_PASSWORD,
  LONG_NAME,
  LONG_PASSWORD,
  INVALID_EMAIL
} = AUTH_ERRORS;

export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().min(3, SHORT_NAME).max(30, LONG_NAME).required(REQUIRED_NAME),
  email: Yup.string().email(INVALID_EMAIL).required(REQUIRED_EMAIL),
  password: Yup.string().min(4, SHORT_PASSWORD).max(30, LONG_PASSWORD).required(REQUIRED_PASSWORD)
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().min(3, SHORT_NAME).max(30, LONG_NAME),
  name: Yup.string().min(3, SHORT_NAME).max(30, LONG_NAME),
  password: Yup.string().min(4, SHORT_PASSWORD).max(30, LONG_PASSWORD).required(REQUIRED_PASSWORD)
});

export const columnValidationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(20).required()
});

export const todoValidationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(20).required()
});
