import { useUserData } from "../../common/context/user-context";
import { CodeBlockTop, CodeBlockBottom, MainContainer, Header, CodeBlockMid, CodeBlockHeading, FriendCode, CodeBlockText, CodeBlockInput, UserContainer, UserAvatar, UserName, Button } from "./index.styled"
import { useGetUserByFriendCode, useSendFriendRequest } from "../../common/services/user.service";
import { useEffect, useState } from "react";
import { IUser } from "../../types/User";

export const AddFriend = () => {
  const UserDataContext = useUserData();
  const getUserByFriendCodeMutation = useGetUserByFriendCode();
  const [friendCodeInput, setFriendCodeInput] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [foundUser, setFoundUser] = useState<IUser | null>(null);
  const avatar =
    "https://res.cloudinary.com/didkbrlcz/image/upload/v1695624961/System/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full_pfrgqw.jpg";
  const addFriendMutation = useSendFriendRequest()

  const handleSendFriendRequest = (receiverId: string) => {
    if (UserDataContext && UserDataContext.userData) {
      const senderId = UserDataContext?.userData._id;
  
      addFriendMutation.mutate({ senderId, receiverId });
      setRequestSent(true);
    }
  };

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

  useEffect(() => {
    const isRequestSent = UserDataContext?.userData?.sentFriendRequests.some(
      (request) => request.receiverId === foundUser?._id
    );
    
    if (isRequestSent) {
      setRequestSent(true);
    }
  }, [foundUser, UserDataContext?.userData?.sentFriendRequests]);

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
        {foundUser && (
          <UserContainer>
            <UserAvatar src={avatar} />
            <UserName>{foundUser.name}</UserName>
            {!requestSent && (
              <Button onClick={() => handleSendFriendRequest(foundUser._id)}>
                Send Invite
              </Button>
            )}
            {requestSent && (
              <Button onClick={() => handleSendFriendRequest(foundUser._id)}>
                ✔ Invite Sent
              </Button>
            )}
          </UserContainer>
        )}
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