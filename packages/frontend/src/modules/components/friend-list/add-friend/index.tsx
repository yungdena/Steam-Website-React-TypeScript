import { useUserData } from "../../../common/context/user-context";
import { CodeBlockTop, CodeBlockBottom, MainContainer, Header, CodeBlockMid, CodeBlockHeading, FriendCode, CodeBlockText, CodeBlockInput, UserContainer, UserAvatar, UserName, Button } from "./index.styled"
import { useGetUserByFriendCode, useGetUserByName, useSendFriendRequest } from "../../../common/services/user.service";
import { useEffect, useState } from "react";
import { IUser } from "../../../common/types/User";

export const AddFriend = () => {
  const UserDataContext = useUserData();
  const getUserByFriendCodeMutation = useGetUserByFriendCode();
  const getUserByName = useGetUserByName();
  const [friendCodeInput, setFriendCodeInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [requestSentMap, setRequestSentMap] = useState<{
    [userId: string]: boolean;
  }>({});
  const [foundUserByCode, setFoundUserByCode] = useState<IUser | null>(null);
  const [foundUserByName, setFoundUserByName] = useState<IUser[] | null>(null);
  const avatar =
    "https://res.cloudinary.com/didkbrlcz/image/upload/v1695624961/System/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full_pfrgqw.jpg";
  const addFriendMutation = useSendFriendRequest()

  const handleSendFriendRequest = (receiverId: string) => {
    if (UserDataContext && UserDataContext.userData) {
      const senderId = UserDataContext?.userData._id;

      const isAlreadyFriend = UserDataContext.userData.friends.includes(receiverId);

      if (!isAlreadyFriend) {
        addFriendMutation.mutate({ senderId, receiverId });
        setRequestSentMap((prevState) => ({ ...prevState, [receiverId]: true }));
      } else {
        console.log("You are already friends with this user.");
      }
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
      if (input !== UserDataContext?.userData?.friendCode) {
        try {
          const user = await getUserByFriendCodeMutation.mutateAsync(input);

          if (user) {
            setFoundUserByCode(user);
          } else {
            setFoundUserByCode(null);
          }
        } catch (error) {
          console.error("Error searching for user:", error);
        }
      }
    }, 1000);
  };

  const handleNameInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target.value;
    setNameInput(input);
    let searchTimeout;
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(async () => {
      try {
        const user = await getUserByName.mutateAsync(input);

        if (user) {
          setFoundUserByName(user.filter((user: IUser) => user.name !== UserDataContext?.userData?.name));
        } else {
          setFoundUserByName(null);
        }
      } catch (error) {
        console.error("Error searching for user:", error);
      }
    }, 1000);
  };

  useEffect(() => {
    if (foundUserByCode && UserDataContext?.userData) {
      const isRequestSent = UserDataContext.userData.sentFriendRequests.some(
        (request: any) => request.receiverId === foundUserByCode._id
      );

      setRequestSentMap((prevState) => ({
        ...prevState,
        [foundUserByCode._id]: isRequestSent,
      }));
    }
  }, [foundUserByCode, UserDataContext?.userData?.sentFriendRequests]);

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
        {foundUserByCode && (
          <UserContainer>
            <UserAvatar src={foundUserByCode.avatar || avatar} />
            <UserName>{foundUserByCode.name}</UserName>
            {!requestSentMap[foundUserByCode._id] && (
              <Button
                onClick={() => handleSendFriendRequest(foundUserByCode._id)}
              >
                Send Invite
              </Button>
            )}
            {requestSentMap[foundUserByCode._id] && (
              <Button
                onClick={() => handleSendFriendRequest(foundUserByCode._id)}
              >
                ✔ Invite Sent
              </Button>
            )}
          </UserContainer>
        )}
      </CodeBlockTop>
      <CodeBlockBottom>
        <CodeBlockHeading>Or try searching for your friend</CodeBlockHeading>
        <CodeBlockInput
          value={nameInput}
          onChange={handleNameInputChange}
          style={{ marginTop: 20 }}
          placeholder="Enter your friend's profile name"
        />
        {foundUserByName && (
          <div>
            {foundUserByName.slice(0, 3).map((user, index) => (
              <UserContainer key={index}>
                <UserAvatar src={user.avatar || avatar} />
                <UserName>{user.name}</UserName>
                {!requestSentMap[user._id] && (
                  <Button onClick={() => handleSendFriendRequest(user._id)}>
                    Send Invite
                  </Button>
                )}
                {requestSentMap[user._id] && (
                  <Button onClick={() => handleSendFriendRequest(user._id)}>
                    ✔ Invite Sent
                  </Button>
                )}
              </UserContainer>
            ))}
          </div>
        )}
      </CodeBlockBottom>
    </MainContainer>
  );
};