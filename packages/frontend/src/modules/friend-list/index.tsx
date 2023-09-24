import { useUserData } from "../common/context/user-context"
import { Header } from "../header"
import { Footer } from "../home/footer";
import { AddFriend } from "./add-friend";
import { Background, BackgroundImage, Button, ButtonsMenu, ButtonWrapper, MainContainer, MenuContainer, MenuTitle, UserContainer, UserName } from "./index.styled"

export const FriendList = () => {
  const UserDataContext = useUserData();

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
                <ButtonWrapper>
                  <Button>Your Friends</Button>
                </ButtonWrapper>
                <ButtonWrapper>
                  <Button backgroundPosition="0 -176px">Add a Friend</Button>
                </ButtonWrapper>
                <ButtonWrapper>
                  <Button backgroundPosition="0 -32px">Pending invites</Button>
                </ButtonWrapper>
                <ButtonWrapper>
                  <Button backgroundPosition="0 -64px">Blocked</Button>
                </ButtonWrapper>
              </ButtonsMenu>
              <AddFriend />
            </MenuContainer>
          </MainContainer>
        </BackgroundImage>
      </Background>
      <Footer />
    </>
  );
}