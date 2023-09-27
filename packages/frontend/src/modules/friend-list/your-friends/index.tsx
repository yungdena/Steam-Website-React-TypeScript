import {  AddFriend, FriendsList, Heading, HeadingTitle, MainContainer, NoFriends } from "./index.styled"

interface IComponent {
  friendsCount: number | undefined,
  friendsList: string[] | undefined,
  setComponent: any;
}

export const YourFriends = ({ friendsCount, friendsList, setComponent }: IComponent) => {
  return (
    <MainContainer>
      <Heading>
        <HeadingTitle>
          Your Friends {friendsCount !== undefined && `(${friendsCount})`}
        </HeadingTitle>
      </Heading>
      <FriendsList>
        {friendsCount !== undefined && friendsCount === 0 && (
          <>
            <NoFriends>No Friends?</NoFriends>
            <AddFriend onClick={() => setComponent('AddFriend')}>Add Friend</AddFriend>
          </>
        )}
        {friendsList !== undefined && friendsList.length > 0 && (
          <div>
            <ul>
              {friendsList.map((friend, index) => (
                <li key={index}>{friend}</li>
              ))}
            </ul>
          </div>
        )}
      </FriendsList>
    </MainContainer>
  );
};