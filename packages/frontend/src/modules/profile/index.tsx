import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { APP_KEYS } from "../common/consts";
import { defaultAvatar } from "../common/consts/avatar";
import { useAppsData } from "../common/context/apps-context";
import { useUserData } from "../common/context/user-context";
import { useGetUserById } from "../common/services/user.service";
import { IApp } from "../common/types/app.interface";
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
  ActivityContainer,
  ProfileInfoContainer,
  InfoContainer,
  ActivityTitle,
  GameContainer,
  GameImage,
  GameTitle,
  AchievementsContainer,
} from "./index.styled";

export const Profile = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const getUserByIdMutation = useGetUserById();
  const UserDataContext = useUserData();
  const { appsData } = useAppsData();
  const loggedId = localStorage.getItem('account');
  const parsedId = loggedId ? JSON.parse(loggedId) : null;
  const isOwnProfile = id === parsedId;
  const history = useHistory();

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

  const getAppById = (appId: string) => {
    return appsData.find((app: IApp) => app._id === appId);
  };

  console.log('userData', userData)

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
            ) : isFriend ? (
              <Button>in Friends</Button>
            ) : (
              <Button>Add Friend</Button>
            )}
          </ProfileHeading>
          <InfoContainer>
            <ActivityContainer>
              <ActivityTitle>Recent Activity</ActivityTitle>
              {userData?.apps.slice(0, 3).map((appId: string) => {
                const appData = getAppById(appId);
                console.log(appData);
                if (appData) {
                  return (
                    <GameContainer key={appId}>
                      <div style={{ display: "flex" }}>
                        <GameImage
                          onClick={() =>
                            history.push("/" + "apps/" + appData._id)
                          }
                          src={appData.bannerImage}
                        />
                        <GameTitle
                          onClick={() =>
                            history.push("/" + "apps/" + appData._id)
                          }
                        >
                          {appData.title}
                        </GameTitle>
                      </div>
                      <AchievementsContainer
                        onClick={() =>
                          history.push("/" + "apps/" + appData._id)
                        }
                      >
                        App Page
                      </AchievementsContainer>
                    </GameContainer>
                  );
                }
                return null;
              })}
            </ActivityContainer>
            <ProfileInfoContainer></ProfileInfoContainer>
          </InfoContainer>
        </ProfileContainer>
      </MainContainer>
      <Footer />
    </>
  );
};
