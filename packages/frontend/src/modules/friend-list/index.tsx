import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserData } from "../common/context/user-context"
import { useGetUserById } from "../common/services/user.service";
import { Header } from "../header"
import { Footer } from "../home/footer";
import { IUser } from "../types/User";
import { AddFriend } from "./add-friend";
import { Avatar, Background, BackgroundImage, Button, ButtonsMenu, ButtonWrapper, MainContainer, MenuContainer, MenuTitle, UserContainer, UserName } from "./index.styled"
import { PendingInvites } from "./pending-invites";
import { YourFriends } from "./your-friends";
const avatar =
  "https://res.cloudinary.com/didkbrlcz/image/upload/v1695624961/System/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full_pfrgqw.jpg";
export const FriendList = () => {
  const [activeComponent, setActiveComponent] = useState("YourFriends");
  const [user, setUser] = useState<IUser | null>(null)
  const UserDataContext = useUserData();
  const { id } = useParams<{ id: string }>();
  const getUserByIdMutation = useGetUserById();

  const fetchFriendsData = async () => {
    try {
      const user = await getUserByIdMutation.mutateAsync(id);
      setUser(user);
    } catch (error) {
      console.error("Error fetching friends' data:", error);
    }
  };

  useEffect(() => {
    if (UserDataContext?.userData?._id !== id) {
      fetchFriendsData();
    }
  }, [id])

  const renderComponent = () => {
    switch (activeComponent) {
      case "YourFriends":
        return (
          <YourFriends
            setComponent={setActiveComponent}
            friendsList={UserDataContext?.userData?.friends}
            friendsCount={UserDataContext?.userData?.friends.length}
          />
        );
      case "AddFriend":
        return <AddFriend />;
      case "PendingInvites":
        return (
          <PendingInvites
            receivedInvites={UserDataContext?.userData?.friendRequests}
            sentInvites={UserDataContext?.userData?.sentFriendRequests}
          />
        );
      default:
        return;
    }
  };

  return (
    <>
      <Header />
      <Background>
        <BackgroundImage>
          <MainContainer>
            {UserDataContext?.userData?._id === id 
              ? (            
                <>
                  <UserContainer>
                    <Avatar src={avatar} />
                    <UserName>{UserDataContext?.userData?.name}</UserName>
                  </UserContainer><MenuContainer>
                      <ButtonsMenu>
                        <MenuTitle>friends</MenuTitle>
                        <ButtonWrapper
                          onClick={() => setActiveComponent("YourFriends")}
                        >
                          <Button>Your Friends</Button>
                        </ButtonWrapper>
                        <ButtonWrapper onClick={() => setActiveComponent("AddFriend")}>
                          <Button backgroundPosition="0 -176px">Add a Friend</Button>
                        </ButtonWrapper>
                        <ButtonWrapper onClick={() => setActiveComponent("PendingInvites")}>
                          <Button backgroundPosition="0 -32px">Pending invites</Button>
                        </ButtonWrapper>
                      </ButtonsMenu>
                      {renderComponent()}
                    </MenuContainer>
                  </>
                )
              : (
              <>
                <UserContainer>
                  <Avatar src={avatar} />
                  <UserName>{user?.name}</UserName>
                </UserContainer><MenuContainer>
                    <ButtonsMenu>
                      <MenuTitle>friends</MenuTitle>
                      <ButtonWrapper
                        onClick={() => setActiveComponent("YourFriends")}
                      >
                        <Button>All Friends ({user?.friends.length})</Button>
                      </ButtonWrapper>
                    </ButtonsMenu>
                    {renderComponent()}
                  </MenuContainer>
                </>
              )
            }

          </MainContainer>
        </BackgroundImage>
      </Background>
      <Footer />
    </>
  );
}