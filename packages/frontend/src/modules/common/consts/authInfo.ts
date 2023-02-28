export const SIGNUP_INPUTS_1 = [
  {
    label: 'Email Address',
    type: 'email',
    id: 'email'
  },
  {
    label: 'Confirm your Address',
    type: 'email',
    id: 'confirmEmail'
  }
];

export const SIGNUP_INPUTS_2 = [
  {
    label: "Steam Account Name",
    type: "name",
    id: "name",
  },
  {
    label: "Choose Password",
    type: "password",
    id: "password",
  },
  {
    label: "Confirm Password",
    type: "password",
    id: "confirmPassword",
  },
];

export const SIGNIN_INPUTS = [
  {
    placeholder: 'Email',
    type: 'email',
    id: 'email'
  },
  {
    placeholder: 'Password',
    type: 'password',
    id: 'password'
  }
];

export const LABELS = {
  NEED_ACCOUNT: 'Need an account?',
  ALREADY_MEMBER: 'Already a member?',
  LOGIN: 'Login',
  CREATE_ACCOUNT: 'Create account',
  SIGNUP: 'Sign Up',
  SIGNIN: 'Sign In'
};

export const AUTH_ERRORS = {
  SHORT_NAME: 'Name must be at least 3 characters long',
  LONG_NAME: 'Name must be less than 20 characters long',
  SHORT_PASSWORD: 'Password must be at least 4 characters long',
  LONG_PASSWORD: 'Password must be less than 30 characters long',
  INVALID_EMAIL: 'Invalid email address',
  REQUIRED_NAME: 'Name is required',
  REQUIRED_PASSWORD: 'Password is required',
  REQUIRED_EMAIL: 'Email is required',
  REQUIRED_EMAIL_NAME: 'Email / Name is required'
};
