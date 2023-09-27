import { useEffect, useState } from "react";
import { useGetUserById } from "../../common/services/user.service";
import { IUser } from "../../types/User";
import { InviteContainer, InvitesContainer, InviteSender, InvitesHeading, MainContainer, NoInvites } from "./index.styled"

export const PendingInvites = ({ sentInvites, receivedInvites }: any) => {
  const [foundSentUsers, setFoundSentUsers] = useState<IUser[]>([]);
  const [foundReceivedUsers, setFoundReceivedUsers] = useState<IUser[]>([]);
  const getUserByIdMutation = useGetUserById();

  const handleGetUserById = async (userId: string) => {
    try {
      const user = await getUserByIdMutation.mutateAsync(userId);
      setFoundSentUsers((prevFoundUsers: any) => [...prevFoundUsers, user]);
    } catch (error) {
      console.error(`Error fetching user by ID ${userId}:`, error);
    }
  };

  useEffect(() => {
    if (sentInvites.length > 0) {
      sentInvites.forEach((invite: any) => {
        handleGetUserById(invite.receiverId);
      });
    }
    if (receivedInvites.length > 0) {
      receivedInvites.forEach((invite: any) => {
        handleGetUserById(invite.senderId);
      });
    }
  }, []);
  
  return (
    <MainContainer>
      <InvitesHeading>Received Invites</InvitesHeading>
      <InvitesContainer>
        {receivedInvites.length === 0 && (
          <NoInvites>
            Sorry, there are no pending friend invites to show.
          </NoInvites>
        )}
        {receivedInvites.length > 0 && (
          <NoInvites>
            Sorry, there are no pending sent invites to show.
          </NoInvites>
        )}
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
            <InviteSender>{user.name}</InviteSender>
          </InviteContainer>
        ))}
      </InvitesContainer>
    </MainContainer>
  );
}