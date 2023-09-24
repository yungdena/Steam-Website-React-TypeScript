import { CodeBlockTop, CodeBlockBottom, MainContainer, Header, CodeBlockMid, CodeBlockHeading, FriendCode, CodeBlockText, CodeBlockInput } from "./index.styled"

export const AddFriend = () => {
  return (
    <MainContainer>
      <Header>ADD A FRIEND</Header>
      <CodeBlockTop>
        <CodeBlockHeading>Your Friend Code</CodeBlockHeading>
        <FriendCode>1029757586</FriendCode>
        <CodeBlockText>
          Enter your friend's Friend Code to invite them to connect.
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