import { useEffect, useState } from "react";
import { useGetUserById } from "../../common/services/user.service";
import { IUser } from "../../types/User";
import { AddFriend, Avatar, FriendContainer, FriendName, FriendsList, Heading, HeadingTitle, MainContainer, NoFriends } from "./index.styled"

interface IComponent {
  friendsCount: number | undefined,
  friendsList: string[] | undefined,
  setComponent: any;
}
const avatar =
  "https://res.cloudinary.com/didkbrlcz/image/upload/v1695624961/System/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full_pfrgqw.jpg";

export const YourFriends = ({ friendsCount, friendsList, setComponent }: IComponent) => {
  const [friends, setFriends] = useState<IUser[]>([])
  const getUserByIdMutation = useGetUserById();

  const fetchFriendsData = async () => {
    try {
      if(friendsList) {
        const userPromises = friendsList.map((userId) =>
          getUserByIdMutation.mutateAsync(userId)
        );
        const friendsData = await Promise.all(userPromises);
        setFriends(friendsData);
      }
    } catch (error) {
      console.error("Error fetching friends' data:", error);
    }
  };

  useEffect(() => {
    fetchFriendsData();
  }, [friendsList]);

  return (
    <MainContainer>
      <Heading>
        <HeadingTitle>
          Your Friends {friendsCount !== undefined && `(${friendsCount})`}
        </HeadingTitle>
      </Heading>
      <FriendsList>
        {friendsCount !== undefined && friendsCount === 0 && (
          <div>
            <NoFriends>No Friends?</NoFriends>
            <AddFriend onClick={() => setComponent('AddFriend')}>Add Friend</AddFriend>
          </div>
        )}
        {friendsList !== undefined && friendsList.length > 0 && (
          friends.map((friend, index) => (
            <FriendContainer key={index}>
              <Avatar src={avatar}/>
              <FriendName>
                {friend.name}
              </FriendName>
            </FriendContainer>
          ))
        )}
      </FriendsList>
    </MainContainer>
  );
};