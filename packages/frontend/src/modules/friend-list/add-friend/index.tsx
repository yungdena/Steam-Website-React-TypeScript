import { useUserData } from "../../common/context/user-context";
import { CodeBlockTop, CodeBlockBottom, MainContainer, Header, CodeBlockMid, CodeBlockHeading, FriendCode, CodeBlockText, CodeBlockInput, UserContainer, UserAvatar, UserName, Button } from "./index.styled"
import { useGetUserByFriendCode } from "../../common/services/user.service";
import { useState } from "react";
import { IUser } from "../../types/User";

export const AddFriend = () => {
  const UserDataContext = useUserData();
  const getUserByFriendCodeMutation = useGetUserByFriendCode();
  const [friendCodeInput, setFriendCodeInput] = useState("");
  const [foundUser, setFoundUser] = useState<IUser | null>(null);
  const avatar =
    "https://res.cloudinary.com/didkbrlcz/image/upload/v1695624961/System/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full_pfrgqw.jpg";

const handleFriendCodeInputChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const input = e.target.value;
  setFriendCodeInput(input);
  let searchTimeout;
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(async () => {
    try {
      const user = await getUserByFriendCodeMutation.mutateAsync(input);

      if (user) {
        setFoundUser(user);
        console.log(`Found ${user}`);
      } else {
        console.log(`User not found`);
        setFoundUser(null);
      }
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  }, 1000);
};
  console.log('found user', foundUser);

  return (
    <MainContainer>
      <Header>ADD A FRIEND</Header>
      <CodeBlockTop>
        <CodeBlockHeading>Your Friend Code</CodeBlockHeading>
        <FriendCode>{UserDataContext?.userData?.friendCode}</FriendCode>
        <CodeBlockText>
          Enter your friend's Friend Code to invite them to connect.
        </CodeBlockText>
        <CodeBlockInput
          type="text"
          placeholder="Enter a Friend Code"
          value={friendCodeInput}
          onChange={handleFriendCodeInputChange}
        />
      {foundUser && 
        <UserContainer>
          <UserAvatar src={avatar} />
          <UserName>{foundUser.name}</UserName>
          <Button>Send Invite</Button>
        </UserContainer>
      }
      </CodeBlockTop>
      <CodeBlockBottom>
        <CodeBlockHeading>Or try searching for your friend</CodeBlockHeading>
        <CodeBlockInput
          style={{ marginTop: 20 }}
          placeholder="Enter your friend's profile name"
        />
      </CodeBlockBottom>
    </MainContainer>
  );
};