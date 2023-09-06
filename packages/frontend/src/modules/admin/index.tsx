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
import { handleAddReviewContainer, handleAuthorized, handleImageCountChange, handleImageInputChange, handleInputChange, handlePostApp, handleRemoveReview, handleReviewInputChange, handleUpdateApp, handleUpdateImageCountChange, handleUpdateImageInputChange, handleUpdateInputChange, handleUpdateSelectChange } from "./handlers";

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

  console.log('app', updateData)

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
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Description</PropertyTitle>
                <PropertyInput
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Tags</PropertyTitle>
                <PropertyInput
                  name="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Genre</PropertyTitle>
                <PropertyInput
                  name="genre"
                  value={formData.genre}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Developer</PropertyTitle>
                <PropertyInput
                  name="developer"
                  value={formData.developer}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Publisher</PropertyTitle>
                <PropertyInput
                  name="publisher"
                  value={formData.publisher}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Release Date</PropertyTitle>
                <PropertyInput
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Price</PropertyTitle>
                <PropertyInput
                  name="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Images</PropertyTitle>
                <StyledSelect
                  onChange={(e) =>
                    handleImageCountChange(e, setFormData, formData)
                  }
                >
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
                      onChange={(e) =>
                        handleImageInputChange(index, e, formData, setFormData)
                      }
                    />
                  ))}
                </InputContainer>
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Title Image</PropertyTitle>
                <PropertyInput
                  name="titleImage"
                  value={formData.titleImage}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Banner Image</PropertyTitle>
                <PropertyInput
                  name="bannerImage"
                  value={formData.bannerImage}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Languages</PropertyTitle>
                <PropertyInput
                  name="languages.interface"
                  placeholder="interface"
                  value={formData.languages.interface}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
                <PropertyInput
                  name="languages.fullAudio"
                  placeholder="full audio"
                  value={formData.languages.fullAudio}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
                <PropertyInput
                  name="languages.subtitles"
                  placeholder="subtitles"
                  value={formData.languages.subtitles}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </PropertyContainer>
              <Button onClick={() => handlePostApp(postAppMutation, formData)}>
                Post app
              </Button>
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
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Title</PropertyTitle>
                <PropertyInput
                  name="title"
                  value={updateData.title}
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Description</PropertyTitle>
                <PropertyInput
                  name="description"
                  value={updateData.description}
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Tags</PropertyTitle>
                <PropertyInput
                  name="tags"
                  value={updateData.tags}
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Genre</PropertyTitle>
                <PropertyInput
                  name="genre"
                  value={updateData.genre}
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Developer</PropertyTitle>
                <PropertyInput
                  name="developer"
                  value={updateData.developer}
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Publisher</PropertyTitle>
                <PropertyInput
                  name="publisher"
                  value={updateData.publisher}
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Release Date</PropertyTitle>
                <PropertyInput
                  name="releaseDate"
                  value={updateData.releaseDate}
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Price</PropertyTitle>
                <PropertyInput
                  name="price"
                  value={updateData.price}
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>New Price</PropertyTitle>
                <PropertyInput
                  name="newPrice"
                  value={updateData.newPrice}
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Images</PropertyTitle>
                <StyledSelect
                  onChange={(event) =>
                    handleUpdateImageCountChange(
                      event,
                      setUpdateData,
                      updateData
                    )
                  }
                >
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
                      onChange={(e) =>
                        handleUpdateImageInputChange(
                          index,
                          e,
                          updateData,
                          setUpdateData
                        )
                      }
                    />
                  ))}
                </InputContainer>
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Title Image</PropertyTitle>
                <PropertyInput
                  name="titleImage"
                  value={updateData.titleImage}
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Banner Image</PropertyTitle>
                <PropertyInput
                  name="bannerImage"
                  value={updateData.bannerImage}
                  onChange={(event) =>
                    handleUpdateInputChange(event, setUpdateData)
                  }
                />
              </PropertyContainer>
              <PropertyContainer>
                <PropertyTitle>Languages</PropertyTitle>
                <PropertyInput
                  name="languages.interface"
                  placeholder="interface"
                  value={updateData.languages.interface}
                  onChange={(e) => handleUpdateInputChange(e, setUpdateData)}
                />
                <PropertyInput
                  name="languages.fullAudio"
                  placeholder="full audio"
                  value={updateData.languages.fullAudio}
                  onChange={(e) => handleUpdateInputChange(e, setUpdateData)}
                />
                <PropertyInput
                  name="languages.subtitles"
                  placeholder="subtitles"
                  value={updateData.languages.subtitles}
                  onChange={(e) => handleUpdateInputChange(e, setUpdateData)}
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
                        handleUpdateSelectChange(
                          index,
                          "rate",
                          e.target.value,
                          updateData,
                          setUpdateData
                        )
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
                          e.target.value,
                          updateData,
                          setUpdateData
                        )
                      }
                    />
                    <Button
                      onClick={() => handleRemoveReview(index, setFormData)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => handleAddReviewContainer(setReviewContainers)}
                >
                  Add Review
                </Button>
              </PropertyContainer>
              <Button
                onClick={() =>
                  handleUpdateApp(
                    updateData.appId,
                    getAppByIdMutation,
                    updateData,
                    updateAppMutation
                  )
                }
              >
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
