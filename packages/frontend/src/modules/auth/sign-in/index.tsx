import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { SIGNIN_INPUTS, LABELS } from '../../common/consts/authInfo';
import { APP_KEYS } from '../../common/consts';
import { signInValidationSchema } from '../../common/utils/validation';
import { IAccount } from '../../common/types/Account.interface';
import { useSignIn } from '../../common/services/auth.service';

import { Header } from '../../header';
import {
  Form,
  Container,
  LoginContainer,
  QRCodeText, 
  FormControl, 
  QRCodeField, 
  Input, 
  FieldTitle, 
  InputContainer, 
  FieldText,
  CheckboxControl, 
  Checkbox, 
  Button,
  FieldLink
} from "./index.styled";
import { Footer } from './footer';
import { QRCode } from './qrcode/QRCode';

export const SignIn: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  const history = useHistory();
  const signInMutation = useSignIn();

  const handleNavigate = (route: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    history.push(route);
  };

  const formik = useFormik<{
    name: string;
    password: string;
    accounts: IAccount[];
  }>({
    initialValues: {
      name: '',
      password: '',
      accounts: []
    },
    validationSchema: signInValidationSchema,
    onSubmit: () => {}
  });

  const handleAuthorized =
    (route: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      console.log('handleauthorized');

      const user = await signInMutation.mutateAsync({
        name: formik.values.name,
        password: formik.values.password
      });

      if (user.message === 'password') {
        formik.setFieldError('password', 'error');
        return;
      }
      if (user.message === "User not found") {
        formik.setFieldError("name", "error");
        return;
      }

        localStorage.setItem(
          APP_KEYS.STORAGE_KEYS.ACCOUNT,
          JSON.stringify(user)
        );
      console.log('data', user);

      console.log('user', JSON.stringify(user));
      history.push(route);
    };

  return (
    <>
      <Header />
      <Container>
        <LoginContainer>
          <Form>
            <InputContainer>
              <FormControl>
                <FieldTitle>SIGN IN WITH ACCOUNT NAME</FieldTitle>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  id="name"
                  error={formik.errors.name && formik.touched.name}
                />
              </FormControl>
              <FormControl>
                <FieldText>PASSWORD</FieldText>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  id="password"
                  error={formik.errors.password && formik.touched.password}
                />
              </FormControl>
              <CheckboxControl>
                <Checkbox
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  type="checkbox"
                />
                <FieldText>Remember me</FieldText>
              </CheckboxControl>
              <Button onClick={handleAuthorized(APP_KEYS.ROUTER_KEYS.HOME)}>
                Sign in
              </Button>
              <FieldLink>Help, I can't sign in</FieldLink>
            </InputContainer>
            <QRCodeField>
              <FieldTitle>OR SIGN IN WITH QR</FieldTitle>
              <QRCode />
              <FieldText>Currently Unavailable</FieldText>
            </QRCodeField>
          </Form>
        </LoginContainer>
      </Container>
      <Footer />
    </>
  );
};
