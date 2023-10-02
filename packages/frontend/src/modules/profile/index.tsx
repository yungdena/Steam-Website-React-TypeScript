import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultAvatar } from "../common/consts/avatar";
import { useUserData } from "../common/context/user-context";
import { useGetUserById } from "../common/services/user.service";
import { Header } from "../header";
import { IUser } from "../types/User";
import { Footer } from "./footer";
import {
  Button,
  Avatar,
  MainContainer,
  ProfileContainer,
  ProfileHeading,
  Username,
} from "./index.styled";

export const Profile = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const getUserByIdMutation = useGetUserById();
  const UserDataContext = useUserData();
  const loggedId = localStorage.getItem('account');
  const parsedId = loggedId ? JSON.parse(loggedId) : null;
  const isOwnProfile = id === parsedId;

  useEffect(() => {
    const fetchUserDataById = async (userId: string) => {
      try {
        const userData = await getUserByIdMutation.mutateAsync(userId);
        console.log("fetching by id in profile component", userData);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!isOwnProfile && UserDataContext?.userData?.friends.includes(id)) {
      setIsFriend(true);
    }

    if (id) {
      fetchUserDataById(id);
    }
  }, [id]); 

  console.log('userdata: ', userData)
  return (
    <>
      <Header />
      <MainContainer>
        <ProfileContainer>
          <ProfileHeading>
            <Avatar src={userData?.avatar || defaultAvatar} />
            <Username>{userData?.name}</Username>
            {isOwnProfile ? (
              <Button>Edit Profile</Button>
            ) : (
              isFriend ? (
                <Button>
                  in Friends
                </Button>
              ) :
              (
                <Button>Add Friend</Button>
              )
            )}
          </ProfileHeading>
        </ProfileContainer>
      </MainContainer>
      <Footer />
    </>
  );
};
