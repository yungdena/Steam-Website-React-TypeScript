import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../../../common/consts";
import { useUserData } from "../../../common/context/user-context";
import { useGetUserById, useRespondToFriendRequest } from "../../../common/services/user.service";
import { IUser } from "../../../common/types/User";
import { Avatar, ButtonAccept, ButtonDecline, InviteContainer, InvitesContainer, InviteSender, InvitesHeading, MainContainer, NoInvites } from "./index.styled"

export const PendingInvites = ({ sentInvites, receivedInvites }: any) => {
  const [foundSentUsers, setFoundSentUsers] = useState<IUser[]>([]);
  const [foundReceivedUsers, setFoundReceivedUsers] = useState<IUser[]>([]);
  const getUserByIdMutation = useGetUserById();
  const respondToRequestMutation = useRespondToFriendRequest();
  const UserDataContext = useUserData();
  const history = useHistory()
  const avatar =
    "https://res.cloudinary.com/didkbrlcz/image/upload/v1695624961/System/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full_pfrgqw.jpg";
  console.log('received request', receivedInvites)
  const handleGetSentUser = async (userId: string) => {
    try {
      const user = await getUserByIdMutation.mutateAsync(userId);
      setFoundSentUsers((prevFoundUsers: any) => [...prevFoundUsers, user]);
    } catch (error) {
      console.error(`Error fetching user by ID`);
    }
  };

  const handleGetReceivedUser = async (userId: string) => {
    try {
      const user = await getUserByIdMutation.mutateAsync(userId);
      setFoundReceivedUsers((prevFoundUsers: any) => [...prevFoundUsers, user]);
    } catch (error) {
      console.error(`Error fetching user by ID`);
    }
  };

  useEffect(() => {
    if (sentInvites.length > 0) {
      sentInvites.forEach((invite: any) => {
        handleGetSentUser(invite.receiverId);
      });
    }
  }, [sentInvites]);

  useEffect(() => {
    if (receivedInvites.length > 0) {
      receivedInvites.forEach((invite: any) => {
        handleGetReceivedUser(invite.senderId);
      });
    }
  }, [receivedInvites]);

  const handleRequest = async (
    senderId: string,
    receiverId: string,
    response: string,
  ) => {
    if (UserDataContext && UserDataContext.userData) {
      try {
        console.log("receiverId: ", receiverId);
        console.log("senderId: ", senderId);
        const updatedUsers = foundReceivedUsers.filter(
          (user: IUser) => user._id !== senderId
        );
        await respondToRequestMutation.mutateAsync({
          senderId,
          receiverId,
          response,
        });

        const newFriends = [
          ...UserDataContext.userData.friends,
          senderId,
        ];

        UserDataContext.setUser({
          ...UserDataContext.userData,
          friends: newFriends,
        });

        setFoundReceivedUsers(updatedUsers);
      } catch (error) {
        console.error("Error responding to friend request:", error);
      }
    } else {
      console.error("No user data");
    }
  };

  if (!UserDataContext || UserDataContext.userData === null) {
    console.error(
      "UserDataContext or UserDataContext.userData is null or undefined"
    );
    history.push(APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN);
    return <div></div>;
  }

  const userDataId = UserDataContext?.userData?._id || "";

  return userDataId ? (
    <MainContainer>
      <InvitesHeading>Received Invites</InvitesHeading>
      <InvitesContainer>
        {receivedInvites.length === 0 && (
          <NoInvites>
            Sorry, there are no pending friend invites to show.
          </NoInvites>
        )}
        {foundReceivedUsers.map((user: IUser) => (
          <InviteContainer key={user._id}>
            <Avatar src={user.avatar || avatar} />
            <InviteSender>{user.name}</InviteSender>
            <ButtonAccept
              onClick={() => handleRequest(user._id, userDataId, "accepted")}
            >
              Accept
            </ButtonAccept>
            <ButtonDecline
              onClick={() => handleRequest(user._id, userDataId, "declined")}
              style={{ margin: "1.5rem 0 0 0.5rem" }}
            >
              X
            </ButtonDecline>
          </InviteContainer>
        ))}
      </InvitesContainer>
      <InvitesHeading style={{ marginTop: "30px" }}>
        Sent Invites
      </InvitesHeading>
      <InvitesContainer>
        {sentInvites.length === 0 && (
          <NoInvites>
            Sorry, there are no pending sent invites to show.
          </NoInvites>
        )}
        {foundSentUsers.map((user: IUser) => (
          <InviteContainer key={user._id}>
            <Avatar src={user.avatar || avatar} />
            <InviteSender>{user.name}</InviteSender>
            <ButtonDecline
              onClick={() => handleRequest(user._id, userDataId, "declined")}
            >
              Cancel
            </ButtonDecline>
          </InviteContainer>
        ))}
      </InvitesContainer>
    </MainContainer>
  ) : (
    <div></div>
  );
}