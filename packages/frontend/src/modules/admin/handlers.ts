import { IApp } from "../common/types/app.interface";

export const handleAddReviewContainer = (setReviewContainers: any) => {
  setReviewContainers((prevContainers: any) => [...prevContainers, Date.now()]);
};

export const handleRemoveReview = (indexToRemove: any, setFormData: any) => {
  setFormData((prevFormData: any) => {
    const updatedReviews = prevFormData.reviews.filter(
      (_: any, index: any) => index !== indexToRemove
    );
    return {
      ...prevFormData,
      reviews: updatedReviews,
    };
  });
};

export const handleReviewInputChange = (
  index: number,
  field: string,
  value: string | boolean,
  updateData: any,
  setUpdateData: any
) => {
  const newReviews = [...updateData.reviews];
  newReviews[index] = {
    ...newReviews[index],
    [field]: value,
  };
  setUpdateData((prevData: any) => ({
    ...prevData,
    reviews: newReviews,
  }));
};

export const handlePostApp = async (postAppMutation: any, formData: any) => {
  try {
    const response = await postAppMutation.mutateAsync(formData);
    console.log("App posted successfully:", response);
  } catch (error) {
    console.error("Error posting app:", error);
  }
};

// export const handleUpdateApp = async (appId: string, getAppByIdMutation: any, updateData: Partial<IApp>, updateAppMutation: any) => {
//   try {
//     const { data: existingApp } = await getAppByIdMutation.mutateAsync(appId);
//     console.log(existingApp);
//     const updatedData: Partial<IApp> = { ...existingApp };
//     console.log(updatedData);
//     for (const key in updateData) {
//       if (updateData.hasOwnProperty(key)) {
//         const value = updateData[key as keyof typeof updateData];

//         if (typeof value === "string") {
//           if (value.trim() !== "") {
//             updatedData[key as keyof typeof updateData] = value;
//           }
//         } else if (Array.isArray(value)) {
//           const nonEmptyElements = value.filter((item) => {
//             if (Array.isArray(item)) {
//               return item.length > 0;
//             } else if (typeof item === "string") {
//               return item.trim() !== "";
//             }
//             return true;
//           });

//           if (nonEmptyElements.length > 0) {
//             updatedData[key as keyof typeof updateData] = nonEmptyElements;
//           }
//         } else if (typeof value === "object" && value !== null) {
//           if (Object.keys(value).length > 0) {
//             updatedData[key as keyof typeof updateData] = value;
//           }
//         } else {
//           updatedData[key as keyof typeof updateData] = value;
//         }
//       }
//     }

//     const response = await updateAppMutation.mutateAsync([updatedData, appId]);
//     console.log("App updated successfully:", response);
//   } catch (error) {
//     console.error("Error updating app:", error);
//   }
// };

export const handleUpdateApp = async (
  appId: string,
  getAppByIdMutation: any,
  updateData: Partial<IApp>,
  updateAppMutation: any
) => {
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
          const nonEmptyElements = value.filter((item) => {
            if (typeof item === "string" && item.trim() !== "") {
              return true; // Only include non-empty strings
            }
            return false;
          });

          if (nonEmptyElements.length > 0) {
            updatedData[key as keyof typeof updateData] = nonEmptyElements;
          }
        } else if (typeof value === "object" && value !== null) {
          if (
            key === "languages" &&
            Object.values(value as Record<string, string>).some(
              (val) => typeof val === "string" && val.trim() !== ""
            )
          ) {
            updatedData[key as keyof typeof updateData] = value;
          } else if (key !== "languages") {
            if (Object.keys(value).length > 0) {
              updatedData[key as keyof typeof updateData] = value;
            }
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

export const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFormData: any
) => {
  const { name, value } = event.target;

  setFormData((prevFormData: any) => {
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

export const handleUpdateInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setUpdateData: any
) => {
  const { name, value } = event.target;

  if (value.trim() !== "") {
    setUpdateData((prevUpdateData: any) => ({
      ...prevUpdateData,
      [name]: value,
    }));
  }
  setUpdateData((prevUpdateData: any) => {
    if (name.startsWith("languages.")) {
      const languageFieldName = name.split(".")[1];

      return {
        ...prevUpdateData,
        languages: {
          ...prevUpdateData.languages,
          [languageFieldName]: value.split(",").map((item) => item.trim()),
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

export const handleUpdateSelectChange = (
  index: number,
  field: string,
  value: string | boolean,
  updateData: any,
  setUpdateData: any
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
  setUpdateData((prevData: any) => ({
    ...prevData,
    reviews: newReviews,
  }));
};

export const handleImageCountChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  setFormData: any,
  formData: any
) => {
  const selectedCount = parseInt(event.target.value, 10);
  const newImagesUrl = Array(selectedCount).fill("");

  setFormData({
    ...formData,
    imagesUrl: newImagesUrl,
  });
};

export const handleImageInputChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  formData: any,
  setFormData: any
) => {
  console.log("input change");
  const newImagesUrl = [...formData.imagesUrl];
  newImagesUrl[index] = event.target.value;

  setFormData({
    ...formData,
    imagesUrl: newImagesUrl,
  });
};

export const handleUpdateImageCountChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  setUpdateData: any,
  updateData: any
) => {
  const selectedCount = parseInt(event.target.value, 10);
  const newImagesUrl = Array(selectedCount).fill("");

  setUpdateData({
    ...updateData,
    imagesUrl: newImagesUrl,
  });
};

export const handleUpdateImageInputChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  updateData: any,
  setUpdateData: any
) => {
  console.log("input change");
  const newImagesUrl = [...updateData.imagesUrl];
  newImagesUrl[index] = event.target.value;

  setUpdateData({
    ...updateData,
    imagesUrl: newImagesUrl,
  });
};

export const handleAuthorized = async (
    event: React.MouseEvent<HTMLButtonElement>,
    setIsLoading: any,
    formik: any,
    signInMutation: any,
    setIsLogged: any
  ) => {
    setIsLoading(true);
    event.preventDefault();
    console.log("handler");

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