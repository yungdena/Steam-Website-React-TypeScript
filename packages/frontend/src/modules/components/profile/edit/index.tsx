import { useEffect, useRef, useState } from "react";
import { useUserData } from "../../../common/context/user-context";
import { useUpdateUser } from "../../../common/services/user.service";
import { IUser } from "../../../common/types/User";
import { Header } from "../../header"
import { Footer } from "../footer"
import { Background } from "./index.styled";

export const EditProfile = () => {
  const UserDataContext = useUserData();
  const [user, setUser] = useState(UserDataContext?.userData);
  const [initialCloudinaryImageURL, setInitialCloudinaryImageURL] = useState<
    string | null
  >(UserDataContext?.userData?.avatar || null);
  const [cloudinaryImageURL, setCloudinaryImageURL] = useState<string | null>(
    initialCloudinaryImageURL
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
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
        uploadPreset: "deul5wc5",
      },
      function (err: any, result: any) {
        console.log("result", result);
        if (!err && result && result.info && result.info.secure_url) {
          setCloudinaryImageURL(result.info.secure_url);
        }
      }
    );
  }, []);
const handleUpdateUser = async () => {
  try {
    if (user && cloudinaryImageURL) {
      console.log("avatar should change ", cloudinaryImageURL);
      setUser({ ...user, avatar: cloudinaryImageURL });
      console.log("user", user);

      const updatedUser = await updateUserMutation.mutateAsync(user);
      console.log("User updated:", updatedUser);
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

  useEffect(() => {
    setUser(UserDataContext?.userData);
  }, [UserDataContext]);

  console.log("CloudinaryURL:", cloudinaryImageURL);

  return (
    <>
      <Header />
      <Background>
        {user && (
          <form>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            {widgetRef.current && (
              <button
                type="button"
                onClick={() => (widgetRef.current as CloudinaryWidget).open()}
              >
                Change Avatar
              </button>
            )}
            <button
              type="button"
              onClick={handleUpdateUser}
            >
              Update Profile
            </button>
            {cloudinaryImageURL && (
              <img
                src={cloudinaryImageURL}
                alt="Avatar"
                style={{ maxWidth: "100px" }}
              />
            )}
          </form>
        )}
      </Background>
      <Footer />
    </>
  );
};