import { useUserData } from "../common/context/user-context"
import { Header } from "../header"
import { Footer } from "../home/footer"
import { Background, BackgroundImage, MainContainer, UserContainer, UserName } from "./index.styled"

export const FriendList = () => {
  const UserDataContext = useUserData();

  return (
      <>
        <Header />
        <Background>
            <BackgroundImage>
              <MainContainer>
                <UserContainer>
                  <UserName>
                    {UserDataContext?.userData?.name}
                  </UserName>
                </UserContainer>
              </MainContainer>
            </BackgroundImage>
        </Background>
        <Footer />
      </>
  )
}