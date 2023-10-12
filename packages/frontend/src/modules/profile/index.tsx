import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { InfoWrapper } from "../app-page/index.styled";
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
  InfoWrap,
  ProfileInfoTitle,
  ProfileInfoValue,
  ProfileFriendsContainer,
  FriendInfo,
  FriendAvatar,
  FriendName,
} from "./index.styled";

export const Profile = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [friendsData, setFriendsData] = useState<IUser[]>([]);
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
          setUserData(userData);

          if (userData?.friends.length > 0) {
            fetchFriendData(userData.friends);
          }
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

  const fetchFriendData = async (friendIds: string[]) => {
    const friendDataPromises: Promise<IUser | null>[] = friendIds.map(
      async (friendId) => {
        try {
          const friend = await getUserByIdMutation.mutateAsync(friendId);
          return friend;
        } catch (error) {
          console.error(
            `Error fetching friend data for ID ${friendId}:`,
            error
          );
          return null;
        }
      }
    );

    const friendData = await Promise.all(friendDataPromises);

    const filteredFriendData: IUser[] = friendData.filter(
      (friend): friend is IUser => friend !== null
    );

    setFriendsData(filteredFriendData);
  };

  const getAppById = (appId: string) => {
    return appsData.find((app: IApp) => app._id === appId);
  };

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
            <ProfileInfoContainer>
              <InfoWrap>
                <ProfileInfoTitle>Games</ProfileInfoTitle>
                <ProfileInfoValue>{userData?.apps.length}</ProfileInfoValue>
              </InfoWrap>
              <InfoWrap>
                <ProfileInfoTitle>Friends</ProfileInfoTitle>
                <ProfileInfoValue>{userData?.friends.length}</ProfileInfoValue>
              </InfoWrap>
              <ProfileFriendsContainer>
                {friendsData.map((friend) => (
                  <FriendInfo onClick={() => history.push('/' + 'profile/' + friend._id)} key={friend._id}>
                    <FriendAvatar src={friend.avatar || defaultAvatar} />
                    <FriendName>{friend.name}</FriendName>
                  </FriendInfo>
                ))}
              </ProfileFriendsContainer>
            </ProfileInfoContainer>
          </InfoContainer>
        </ProfileContainer>
      </MainContainer>
      <Footer />
    </>
  );
};
