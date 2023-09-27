import { useState } from "react";
import { useUserData } from "../common/context/user-context"
import { Header } from "../header"
import { Footer } from "../home/footer";
import { AddFriend } from "./add-friend";
import { Background, BackgroundImage, Button, ButtonsMenu, ButtonWrapper, MainContainer, MenuContainer, MenuTitle, UserContainer, UserName } from "./index.styled"
import { YourFriends } from "./your-friends";

export const FriendList = () => {
  const [activeComponent, setActiveComponent] = useState("AddFriend");
  const UserDataContext = useUserData();

  const renderComponent = () => {
    switch (activeComponent) {
      case "YourFriends":
        return <YourFriends setComponent={setActiveComponent} friendsList={UserDataContext?.userData?.friends} friendsCount={UserDataContext?.userData?.friends.length} />
      case "AddFriend":
        return <AddFriend />;
      case "PendingInvites":
        return 
      case "Blocked":
        return 
      default:
        return 
    }
  };

  return (
    <>
      <Header />
      <Background>
        <BackgroundImage>
          <MainContainer>
            <UserContainer>
              <UserName>{UserDataContext?.userData?.name}</UserName>
            </UserContainer>
            <MenuContainer>
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
                <ButtonWrapper>
                  <Button backgroundPosition="0 -32px">Pending invites</Button>
                </ButtonWrapper>
                <ButtonWrapper>
                  <Button backgroundPosition="0 -64px">Blocked</Button>
                </ButtonWrapper>
              </ButtonsMenu>
              {renderComponent()}
            </MenuContainer>
          </MainContainer>
        </BackgroundImage>
      </Background>
      <Footer />
    </>
  );
}