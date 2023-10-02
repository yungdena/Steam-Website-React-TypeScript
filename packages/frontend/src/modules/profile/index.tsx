import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultAvatar } from "../common/consts/avatar";
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
  const { id } = useParams<{ id: string }>();
  const getUserByIdMutation = useGetUserById();
  console.log('id', id)
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
            <Button>Edit Profile</Button>
          </ProfileHeading>
        </ProfileContainer>
      </MainContainer>
      <Footer />
    </>
  );
};
