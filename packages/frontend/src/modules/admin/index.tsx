import React, { useReducer, useState } from "react";
import { useFormik } from "formik";

import { signInValidationSchema } from "../common/utils/validation";
import { IAccount } from "../common/types/Account.interface";
import { useSignIn } from "../common/services/auth.service";
import { Header } from "../header";
import {
  Form,
  Container,
  LoginContainer,
  FormControl,
  Input,
  FieldTitle,
  InputContainer,
  FieldText,
  Button,
  FieldLink } from '../auth/sign-in/index.styled'
import { Footer } from "../auth/sign-in/footer";
import { AdminContainer, PropertyContainer, PropertyInput, PropertyTitle } from "./index.styled";
import { Loader } from "../common/loader/loader";

export const AdminPanel: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postApp, setPostApp] = useState(false);
  const [updateApp, setUpdateApp] = useState(false);

  const signInMutation = useSignIn();

  const formik = useFormik<{
    name: string;
    password: string;
    accounts: IAccount[];
  }>({
    initialValues: {
      name: "",
      password: "",
      accounts: [],
    },
    validationSchema: signInValidationSchema,
    onSubmit: () => {},
  });

  const handleAuthorized = async (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsLoading(true);
      event.preventDefault();
      console.log('handler');

      const user = await signInMutation.mutateAsync({
        name: formik.values.name,
        password: formik.values.password,
      });

      if (user.message === "password") {
        formik.setFieldError("password", "error");
        return;
      }
      if (user.message === "User not found") {
        formik.setFieldError("name", "error");
        return;
      }
      if (user.hasOwnProperty("admin")) {
        console.log("data", user);

        console.log("user", JSON.stringify(user));
        setIsLogged(true);
        setIsLoading(false);
      }
    };

    console.log(isLogged);

  return (
    <>
      <Header />
      {isLogged ? (
        <AdminContainer>
          <PropertyContainer
            className="main-property"
            onClick={() => setPostApp(!postApp)}
          >
            <PropertyTitle>Post App</PropertyTitle>
          </PropertyContainer>
          {postApp && (
            <>
              <PropertyContainer>
                <PropertyTitle>Title</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Description</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Tags</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Genre</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Developer</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Publisher</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Release Date</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Price</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Images</PropertyTitle>
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Title Image</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Banner Image</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <Button>Post app</Button>
            </>
          )}
          <PropertyContainer
            className="main-property"
            onClick={() => setUpdateApp(!updateApp)}
          >
            <PropertyTitle>Update App</PropertyTitle>
          </PropertyContainer>
          {updateApp && (
            <>
              <PropertyContainer>
                <PropertyTitle>App Id</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Title</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Description</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Tags</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Genre</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Developer</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Publisher</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Release Date</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Price</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Images</PropertyTitle>
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Title Image</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Banner Image</PropertyTitle>
                <PropertyInput />
              </PropertyContainer>
              <Button>Update app</Button>
            </>
          )}
        </AdminContainer>
      ) : (
        <>
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
                  <Button disabled={isLoading} onClick={handleAuthorized}>
                    {isLoading ? <Loader /> : <>Sign in</>}
                  </Button>
                  <FieldLink>Help, I can't sign in</FieldLink>
                </InputContainer>
              </Form>
            </LoginContainer>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};
