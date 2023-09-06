import React, { useState } from "react";
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
import { AdminContainer, PropertyContainer, PropertyInput, PropertyTitle, StyledSelect } from "./index.styled";
import { Loader } from "../common/loader/loader";
import { useGetAppById, usePostApp, useUpdateApp } from "../common/services/apps.service";
import { IApp } from "../common/types/app.interface";

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
  const [isLogged, setIsLogged] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [postApp, setPostApp] = useState(false);
  const [updateApp, setUpdateApp] = useState(false);

  const signInMutation = useSignIn();
  const postAppMutation = usePostApp();
  const updateAppMutation = useUpdateApp();
  const getAppByIdMutation = useGetAppById()

  const handleAddReviewContainer = () => {
    setReviewContainers((prevContainers) => [...prevContainers, Date.now()]);
  };

  const handleRemoveReview = (indexToRemove: any) => {
    setFormData((prevFormData) => {
      const updatedReviews = prevFormData.reviews.filter(
        (_, index) => index !== indexToRemove
      );
      return {
        ...prevFormData,
        reviews: updatedReviews,
      };
    });
  };

  const handleReviewInputChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const newReviews = [...updateData.reviews];
    newReviews[index] = {
      ...newReviews[index],
      [field]: value,
    };
    setUpdateData((prevData) => ({
      ...prevData,
      reviews: newReviews,
    }));
  };

  const handlePostApp = async () => {
    try {
      const response = await postAppMutation.mutateAsync(formData);
      console.log("App posted successfully:", response);
    } catch (error) {
      console.error("Error posting app:", error);
    }
  };

  const handleUpdateApp = async (appId: string) => {
    try {
      const { data: existingApp } = await getAppByIdMutation.mutateAsync(appId);
      console.log(existingApp);
      const updatedData: Partial<IApp> = { ...existingApp };
      console.log(updatedData);
      for (const key in updateData) {
        if (updateData.hasOwnProperty(key)) {
          const value = updateData[key as keyof typeof updateData];

          if (typeof value === "string") {
            if (value.trim() !== "") {
              updatedData[key as keyof typeof updateData] = value;
            }
          } else if (Array.isArray(value)) {
            // Check if it's an array and has at least one non-empty element
            const nonEmptyElements = value.filter((item) => {
              if (Array.isArray(item)) {
                return item.length > 0;
              } else if (typeof item === "string") {
                return item.trim() !== "";
              }
              return true;
            });

            if (nonEmptyElements.length > 0) {
              updatedData[key as keyof typeof updateData] = nonEmptyElements;
            }
          } else if (typeof value === "object" && value !== null) {
            if (Object.keys(value).length > 0) {
              updatedData[key as keyof typeof updateData] = value;
            }
          } else {
            updatedData[key as keyof typeof updateData] = value;
          }
        }
      }

      const response = await updateAppMutation.mutateAsync([updatedData, appId]);
      console.log("App updated successfully:", response);
    } catch (error) {
      console.error("Error updating app:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      if (name.startsWith("languages.")) {
        const languageFieldName = name.split(".")[1];

        return {
          ...prevFormData,
          languages: {
            ...prevFormData.languages,
            [languageFieldName]: value.split(",").map((item) => item.trim()),
          },
        };
      } else if (name === "genre" || name === "tags") {
        return {
          ...prevFormData,
          [name]: value.split(",").map((item) => item.trim()),
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  const handleUpdateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.trim() !== "") {
      setUpdateData((prevUpdateData) => ({
        ...prevUpdateData,
        [name]: value,
      }));
    }
    setUpdateData((prevUpdateData) => {
      if (name.startsWith("languages.")) {
        const languageFieldName = name.split(".")[1];

        return {
          ...prevUpdateData,
          languages: {
            ...prevUpdateData.languages,
            [languageFieldName]: value
              .split(",")
              .map((item) => item.trim()),
          },
        };
      } else if (name === "genre" || name === "tags") {
        return {
          ...prevUpdateData,
          [name]: value.split(",").map((item) => item.trim()),
        };
      } else {
        return {
          ...prevUpdateData,
          [name]: value,
        };
      }
    });
  };

  const handleUpdateSelectChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const newReviews = [...updateData.reviews];
    if (field === "rate") {
      newReviews[index] = {
        ...newReviews[index],
        rate: value === "true", // Convert the string value to boolean
      };
    } else {
      newReviews[index] = {
        ...newReviews[index],
        [field]: value,
      };
    }
    setUpdateData((prevData) => ({
      ...prevData,
      reviews: newReviews,
    }));
  };
  const handleImageCountChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCount = parseInt(event.target.value, 10);
    const newImagesUrl = Array(selectedCount).fill("");

    setFormData({
      ...formData,
      imagesUrl: newImagesUrl,
    });
  };

  const handleImageInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('input change')
    const newImagesUrl = [...formData.imagesUrl];
    newImagesUrl[index] = event.target.value; 

    setFormData({
      ...formData,
      imagesUrl: newImagesUrl,
    });
  };

    const handleUpdateImageCountChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const selectedCount = parseInt(event.target.value, 10);
      const newImagesUrl = Array(selectedCount).fill("");

      setUpdateData({
        ...updateData,
        imagesUrl: newImagesUrl,
      });
    };

    const handleUpdateImageInputChange = (
      index: number,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      console.log("input change");
      const newImagesUrl = [...updateData.imagesUrl];
      newImagesUrl[index] = event.target.value;

      setUpdateData({
        ...updateData,
        imagesUrl: newImagesUrl,
      });
    };

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
        setIsLoading(false);
        return;
      }
      if (user.message === "User not found") {
        formik.setFieldError("name", "error");
        setIsLoading(false);
        return;
      }
      if (user.hasOwnProperty("admin")) {
        console.log("data", user);

        console.log("user", JSON.stringify(user));
        setIsLogged(true);
        setIsLoading(false);
      }
      setIsLoading(false);
  };

  console.log(updateData);

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
                <PropertyInput
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Description</PropertyTitle>
                <PropertyInput
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Tags</PropertyTitle>
                <PropertyInput
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Genre</PropertyTitle>
                <PropertyInput
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Developer</PropertyTitle>
                <PropertyInput
                  name="developer"
                  value={formData.developer}
                  onChange={handleInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Publisher</PropertyTitle>
                <PropertyInput
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Release Date</PropertyTitle>
                <PropertyInput
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Price</PropertyTitle>
                <PropertyInput
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Images</PropertyTitle>
                <StyledSelect onChange={handleImageCountChange}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </StyledSelect>
                <InputContainer>
                  {formData.imagesUrl.map((imageUrl, index) => (
                    <PropertyInput
                      key={index}
                      name={`imagesUrl[${index}]`}
                      value={imageUrl}
                      onChange={(e) => handleImageInputChange(index, e)}
                    />
                  ))}
                </InputContainer>
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Title Image</PropertyTitle>
                <PropertyInput
                  name="titleImage"
                  value={formData.titleImage}
                  onChange={handleInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Banner Image</PropertyTitle>
                <PropertyInput
                  name="bannerImage"
                  value={formData.bannerImage}
                  onChange={handleInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Languages</PropertyTitle>
                <PropertyInput
                  name="languages.interface"
                  placeholder="interface"
                  value={formData.languages.interface}
                  onChange={handleInputChange}
                />
                <PropertyInput
                  name="languages.fullAudio"
                  placeholder="full audio"
                  value={formData.languages.fullAudio}
                  onChange={handleInputChange}
                />
                <PropertyInput
                  name="languages.subtitles"
                  placeholder="subtitles"
                  value={formData.languages.subtitles}
                  onChange={handleInputChange}
                />
              </PropertyContainer>
              <Button onClick={handlePostApp}>Post app</Button>
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
                <PropertyInput
                  name="appId"
                  value={updateData.appId}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Title</PropertyTitle>
                <PropertyInput
                  name="title"
                  value={updateData.title}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Description</PropertyTitle>
                <PropertyInput
                  name="description"
                  value={updateData.description}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Tags</PropertyTitle>
                <PropertyInput
                  name="tags"
                  value={updateData.tags}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Genre</PropertyTitle>
                <PropertyInput
                  name="genre"
                  value={updateData.genre}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Developer</PropertyTitle>
                <PropertyInput
                  name="developer"
                  value={updateData.developer}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Publisher</PropertyTitle>
                <PropertyInput
                  name="publisher"
                  value={updateData.publisher}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Release Date</PropertyTitle>
                <PropertyInput
                  name="releaseDate"
                  value={updateData.releaseDate}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Price</PropertyTitle>
                <PropertyInput
                  name="price"
                  value={updateData.price}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>New Price</PropertyTitle>
                <PropertyInput
                  name="newPrice"
                  value={updateData.newPrice}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Images</PropertyTitle>
                <StyledSelect onChange={handleUpdateImageCountChange}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </StyledSelect>
                <InputContainer>
                  {updateData.imagesUrl.map((imageUrl, index) => (
                    <PropertyInput
                      key={index}
                      name={`imagesUrl[${index}]`}
                      value={imageUrl}
                      onChange={(e) => handleUpdateImageInputChange(index, e)}
                    />
                  ))}
                </InputContainer>
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Title Image</PropertyTitle>
                <PropertyInput
                  name="titleImage"
                  value={updateData.titleImage}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Banner Image</PropertyTitle>
                <PropertyInput
                  name="bannerImage"
                  value={updateData.bannerImage}
                  onChange={handleUpdateInputChange}
                />
              </PropertyContainer>
              <PropertyContainer className="column">
                <PropertyTitle>Reviews</PropertyTitle>
                {reviewContainers.map((timestamp, index) => (
                  <div key={timestamp}>
                    <StyledSelect
                      name={`reviews[${index}].rate`}
                      defaultValue={String(
                        updateData.reviews[index]?.rate || "false"
                      )}
                      onChange={(e) =>
                        handleUpdateSelectChange(index, "rate", e.target.value)
                      }
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </StyledSelect>
                    <PropertyInput
                      placeholder="Text"
                      value={updateData.reviews[index]?.description || ""}
                      onChange={(e) =>
                        handleReviewInputChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />
                    <Button onClick={() => handleRemoveReview(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button onClick={handleAddReviewContainer}>Add Review</Button>
              </PropertyContainer>
              <Button onClick={() => handleUpdateApp(updateData.appId)}>
                Update app
              </Button>
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
