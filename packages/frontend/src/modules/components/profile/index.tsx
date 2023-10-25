import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { defaultAvatar } from "../../common/consts/avatar";
import { useAppsData } from "../../common/context/apps-context";
import { useUserData } from "../../common/context/user-context";
import { useGetUserById, useSendFriendRequest, useRemoveFriend } from "../../common/services/user.service";
import { IApp } from "../../common/types/app.interface";
import { Header } from "../header";
import { IUser } from "../../common/types/User";
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
import { fetchFriendData, fetchUserDataById, getAppById, handleRemoveFriend, handleSendFriendRequest } from "./utils/functions";

export const Profile = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);
  const [friendsData, setFriendsData] = useState<IUser[]>([]);
  const { id } = useParams<{ id: string }>();
  const getUserByIdMutation = useGetUserById();
  const addFriendMutation = useSendFriendRequest();
  const removeFriendMutation = useRemoveFriend();
  const UserDataContext = useUserData();
  const { appsData } = useAppsData();
  const loggedId = localStorage.getItem('account');
  const parsedId = loggedId ? JSON.parse(loggedId) : null;
  const isOwnProfile = id === parsedId;
  const history = useHistory();
  
    useEffect(() => {
      if (!isOwnProfile && UserDataContext?.userData?.friends.includes(id)) {
        setIsFriend(true);
      }

      if (id) {
        fetchUserDataById(id, getUserByIdMutation, setUserData, setFriendsData, fetchFriendData);
      }
    }, [id]);

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
            ) : requestSent ? (
              <Button>Request Sent</Button>
            ) : isFriend ? (
              <Button
                onClick={() =>
                  handleRemoveFriend(
                    userData?._id,
                    UserDataContext,
                    removeFriendMutation,
                    setRequestSent
                  )
                }
              >
                Remove Friend
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleSendFriendRequest(
                    userData?._id,
                    UserDataContext,
                    addFriendMutation,
                    setRequestSent
                  )
                }
              >
                Add Friend
              </Button>
            )}
          </ProfileHeading>
          <InfoContainer>
            <ActivityContainer>
              <ActivityTitle>Recent Activity</ActivityTitle>
              {userData?.apps.slice(0, 3).map((appId: string) => {
                const appData = getAppById(appId, appsData);
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
              <InfoWrap
                onClick={() => history.push("/library" + "/" + userData?._id)}
              >
                <ProfileInfoTitle>Games</ProfileInfoTitle>
                <ProfileInfoValue>{userData?.apps.length}</ProfileInfoValue>
              </InfoWrap>
              <InfoWrap
                onClick={() => history.push("/friends" + "/" + userData?._id)}
              >
                <ProfileInfoTitle>Friends</ProfileInfoTitle>
                <ProfileInfoValue>{userData?.friends.length}</ProfileInfoValue>
              </InfoWrap>
              <ProfileFriendsContainer>
                {friendsData.map((friend) => (
                  <FriendInfo
                    onClick={() => history.push("/" + "profile/" + friend._id)}
                    key={friend._id}
                  >
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
