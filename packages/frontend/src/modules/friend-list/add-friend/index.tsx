import { useUserData } from "../../common/context/user-context";
import { CodeBlockTop, CodeBlockBottom, MainContainer, Header, CodeBlockMid, CodeBlockHeading, FriendCode, CodeBlockText, CodeBlockInput } from "./index.styled"

export const AddFriend = () => {
  const UserDataContext = useUserData()
  return (
    <MainContainer>
      <Header>ADD A FRIEND</Header>
      <CodeBlockTop>
        <CodeBlockHeading>Your Id</CodeBlockHeading>
        <FriendCode>{UserDataContext?.userData?.friendCode}</FriendCode>
        <CodeBlockText>
          Enter your friend's Id to invite them to connect.
        </CodeBlockText>
        <CodeBlockInput placeholder="Enter a Friend Code" />
      </CodeBlockTop>
      <CodeBlockBottom>
        <CodeBlockHeading>Or try searching for your friend</CodeBlockHeading>
        <CodeBlockInput style={{marginTop:20}} placeholder="Enter your friend's profile name" />
      </CodeBlockBottom>
    </MainContainer>
  );
}