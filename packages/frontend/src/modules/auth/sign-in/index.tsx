import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { APP_KEYS } from '../../common/consts';
import { signInValidationSchema } from '../../common/utils/validation';
import { IAccount } from '../../common/types/Account.interface';
import { useSignIn } from '../../common/services/auth.service';
import { Loader } from '../../common/loader/loader'
import { Header } from '../../header';
import { useUserData } from '../../common/context/user-context';
import {
  Form,
  Container,
  LoginContainer,
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
  const [isLoading, setIsLoading] = useState(false);
  const UserDataContext = useUserData();

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  const history = useHistory();
  const signInMutation = useSignIn();

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
      setIsLoading(true)
      console.log('handleauthorized');

      const user = await signInMutation.mutateAsync({
        name: formik.values.name,
        password: formik.values.password
      });

      setIsLoading(false)

      if (user.message === 'password') {
        formik.setFieldError('password', 'error');
        return;
      }
      if (user.message === "User not found") {
        formik.setFieldError("name", "error");
        return;
      }
      UserDataContext?.setUser(user);
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
              <Button disabled={isLoading} onClick={handleAuthorized(APP_KEYS.ROUTER_KEYS.HOME)}>
                {isLoading 
                ? <Loader />
                : "Sign In"
                }
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
