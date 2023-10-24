import React, { useState } from "react";
import { useFormik } from "formik";

import { signInValidationSchema } from "../common/utils/validation";
import { IAccount } from "../common/types/Account.interface";
import { useSignIn } from "../common/services/auth.service";
import { Header } from "../components/header";
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
  FieldLink } from '../components/auth/sign-in/index.styled'
import { Footer } from "../components/auth/sign-in/footer";
import { Loader } from "../common/loader/loader";
import { useGetAppById, usePostApp, useUpdateApp } from "../common/services/apps.service";
import { IApp } from "../common/types/app.interface";
import { handleAddReviewContainer, handleAuthorized, handleImageCountChange, handleImageInputChange, handleInputChange, handlePostApp, handleRemoveReview, handleReviewInputChange, handleUpdateApp, handleUpdateImageCountChange, handleUpdateImageInputChange, handleUpdateInputChange, handleUpdateSelectChange } from "./handlers";
import { Admin } from "./container/admin-container";

export const AdminPanel: React.FC = () => {
  const [formData, setFormData] = useState<IApp>({
    title: '',
    description: '',
    tags: [],
    genre: [],
    developer: '',
    publisher: '',
    releaseDate: '',
    price: '',
    imagesUrl: [],
    titleImage: '',
    bannerImage: '',
    reviews: [],
    languages: {
      interface: [] as string[],
      fullAudio: [] as string[],
      subtitles: [] as string[],
    },
  });
  const [updateData, setUpdateData] = useState<IApp>({
    title: "",
    description: "",
    tags: [],
    genre: [],
    developer: "",
    publisher: "",
    releaseDate: "",
    price: "",
    newPrice: "",
    reviews: [],
    imagesUrl: [],
    titleImage: "",
    bannerImage: "",
    languages: {
      interface: [] as string[],
      fullAudio: [] as string[],
      subtitles: [] as string[],
    },
  });
  const [reviewContainers, setReviewContainers] = useState<number[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postApp, setPostApp] = useState(false);
  const [updateApp, setUpdateApp] = useState(false);

  const signInMutation = useSignIn();
  const postAppMutation = usePostApp();
  const updateAppMutation = useUpdateApp();
  const getAppByIdMutation = useGetAppById()

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

  console.log("formData in Main", formData);
  return (
    <>
      <Header />
      {isLogged ? (
        <Admin
          postApp={postApp}
          setPostApp={setPostApp}
          updateApp={updateApp}
          setUpdateApp={setUpdateApp}
          handlePostApp={handlePostApp}
          updateData={updateData}
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleImageCountChange={handleImageCountChange}
          handleImageInputChange={handleImageInputChange}
          postAppMutation={postAppMutation}
          handleUpdateInputChange={handleUpdateInputChange}
          setUpdateData={setUpdateData}
          handleUpdateImageInputChange={handleUpdateImageInputChange}
          handleUpdateImageCountChange={handleUpdateImageCountChange}
          handleUpdateSelectChange={handleUpdateSelectChange}
          handleReviewInputChange={handleReviewInputChange}
          handleRemoveReview={handleRemoveReview}
          handleUpdateApp={handleUpdateApp}
          getAppByIdMutation={getAppByIdMutation}
          updateAppMutation={updateAppMutation}
          handleAddReviewContainer={handleAddReviewContainer}
          reviewContainers={reviewContainers}
          setReviewContainers={setReviewContainers}
        />
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
                  <Button
                    disabled={isLoading}
                    onClick={(e) =>
                      handleAuthorized(
                        e,
                        setIsLoading,
                        formik,
                        signInMutation,
                        setIsLogged
                      )
                    }
                  >
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
