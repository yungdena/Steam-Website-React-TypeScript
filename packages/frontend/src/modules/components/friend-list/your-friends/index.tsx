import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { APP_KEYS } from "../../../common/consts";
import { useGetUserById } from "../../../common/services/user.service";
import { IUser } from "../../../common/types/User";
import { AddFriend, Avatar, FriendContainer, FriendName, FriendsList, Heading, HeadingTitle, MainContainer, NoFriends } from "./index.styled"

interface IComponent {
  friendsCount: number | undefined,
  friendsList: string[] | undefined,
  setComponent: any;
}
const avatar =
  "https://res.cloudinary.com/didkbrlcz/image/upload/v1695624961/System/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full_pfrgqw.jpg";

export const YourFriends = ({ setComponent }: IComponent) => {
  const [friends, setFriends] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const getUserByIdMutation = useGetUserById();
  const history = useHistory();
  const { id } = useParams<{id: string}>();

  const fetchFriendsData = async () => {
    try {
      const user = await getUserByIdMutation.mutateAsync(id);
      setUser(user);
      if (user) {
        const friendList = user.friends;
        const userPromises = friendList.map((userId: string) =>
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
  }, [id]);

  const navigateToProfile = (id: string) => {
    history.push(
      APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.PROFILE + `/${id}`
    );
  };

  return (
    <MainContainer>
      <Heading>
        <HeadingTitle>
          {user?.name}'s friends {friends.length !== undefined && `(${friends.length})`}
        </HeadingTitle>
      </Heading>
      <FriendsList>
        {friends.length !== undefined && friends.length === 0 && (
          <div>
            <NoFriends>No Friends?</NoFriends>
            <AddFriend onClick={() => setComponent("AddFriend")}>
              Add Friend
            </AddFriend>
          </div>
        )}
        {friends !== undefined &&
          friends.length > 0 &&
          friends.map((friend, index) => (
            <FriendContainer
              onClick={() => navigateToProfile(friend._id)}
              key={index}
            >
              <Avatar src={avatar} />
              <FriendName>{friend.name}</FriendName>
            </FriendContainer>
          ))}
      </FriendsList>
    </MainContainer>
  );
};