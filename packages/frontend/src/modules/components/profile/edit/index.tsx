import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../../../common/consts";
import { useUserData } from "../../../common/context/user-context";
import { useUpdateUser } from "../../../common/services/user.service";
import { Header } from "../../header"
import { Footer } from "../footer"
import { About, AboutSection, AboutTitle, Avatar, AvatarSection, AvatarWrapper, Background, ButtonWrapper, CancelButton, EditAvatar, EditAvatarDescription, Form, FormTitle, MainContainer, ProfileHeading, ProfileName, SaveButton, StyledInput, StyledLabel } from "./index.styled";

export const EditProfile = () => {
  const UserDataContext = useUserData();
  const history = useHistory();
  const [user, setUser] = useState(UserDataContext?.userData);
  const [initialCloudinaryImageURL, setInitialCloudinaryImageURL] = useState<
    string | null
  >(UserDataContext?.userData?.avatar || null);
  const [cloudinaryImageURL, setCloudinaryImageURL] = useState<string | null>(
    initialCloudinaryImageURL
  );
  const updateUserMutation = useUpdateUser();
  const cloudinaryRef = useRef();
  const widgetRef = useRef<CloudinaryWidget | null>(null);
  interface CloudinaryWidget {
    open: () => void;
  }
  useEffect(() => {
    if (cloudinaryImageURL !== null) {
      setInitialCloudinaryImageURL(cloudinaryImageURL);
      if (user && cloudinaryImageURL) {
        setUser({ ...user, avatar: cloudinaryImageURL });
      }
    }
  }, [cloudinaryImageURL]);

  useEffect(() => {
    cloudinaryRef.current = (window as any).cloudinary;
    widgetRef.current = (cloudinaryRef.current as any).createUploadWidget(
      {
        cloudName: "didkbrlcz",
        uploadPreset: "ivqnjn7v",
        cropping: "true",
        croppingCoordinatesMode: "custom",
        showSkipCropButton: false,
        croppingAspectRatio: 1
      },
      function (err: any, result: any) {
        if (!err && result && result.info && result.info.secure_url) {
          setCloudinaryImageURL(result.info.secure_url);
        }
      }
    );
  }, []);

  const handleUpdateUser = async () => {
    try {
      if (user && cloudinaryImageURL) {
        setUser({ ...user, avatar: cloudinaryImageURL });

        const updatedUser = await updateUserMutation.mutateAsync(user);
        history.push(`/${APP_KEYS.ROUTER_KEYS.PROFILE}/${user._id}`)
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    setUser(UserDataContext?.userData);
  }, [UserDataContext]);

  return (
    <>
      <Header />
      <Background>
        <MainContainer>
          <ProfileHeading>
            <Avatar src={user?.avatar} />
            <ProfileName>{UserDataContext?.userData?.name}</ProfileName>
          </ProfileHeading>
          <About>
            <AboutTitle>ABOUT</AboutTitle>
            <AboutSection>
              Set your profile name and details. Providing additional
              information like your real name can help friends find you on the
              "Steam" Community
            </AboutSection>
          </About>
          <FormTitle>GENERAL</FormTitle>
          {user && (
            <Form>
              <StyledLabel>Profile name</StyledLabel>
              <StyledInput
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <AvatarSection>
                <AboutTitle>AVATAR</AboutTitle>
                <AvatarWrapper>
                  <EditAvatar src={cloudinaryImageURL || user.avatar} />
                  <div>
                    <CancelButton
                      type="button"
                      onClick={() =>
                        (widgetRef.current as CloudinaryWidget).open()
                      }
                      style={{ marginLeft: "2rem" }}
                    >
                      Upload your avatar
                    </CancelButton>
                    <EditAvatarDescription style={{ marginLeft: "2rem" }}>
                      Upload a file from your device. Image should be square, at
                      least 400px x 400px.
                    </EditAvatarDescription>
                  </div>
                </AvatarWrapper>
              </AvatarSection>
              <ButtonWrapper>
                <CancelButton
                  onClick={() =>
                    history.push(`/${APP_KEYS.ROUTER_KEYS.PROFILE}/${user._id}`)
                  }
                >
                  Cancel
                </CancelButton>
                <SaveButton type="button" onClick={handleUpdateUser}>
                  Save
                </SaveButton>
              </ButtonWrapper>
            </Form>
          )}
        </MainContainer>
      </Background>
      <Footer />
    </>
  );
};