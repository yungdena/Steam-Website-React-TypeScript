import styled from "styled-components";
import { COLORS } from "../../theme";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 940px;
  margin-top: 20px;
`;

export const Heading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #015e80;
  height: 42px;
`;

export const HeadingTitle = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
  color: #fff;
  font-weight: normal;
  min-width: 250px;
`;

export const FriendsList = styled.div`
  width: 940px;
  min-height: 250px;
  padding: 2rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
`;

export const NoFriends = styled.div`
  margin-top: 20px;
  font-size: 20px;
  color: white;
`

export const AddFriend = styled.div`
  font-size: 24px;
  color: ${COLORS.blue};
  cursor: pointer;
`;

export const FriendContainer = styled.div`
  width: 290px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.3);
  color: ${COLORS.tagBlue};
  display: flex;
`

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-right: 4px solid ${COLORS.tagBlue};
  box-sizing: content-box;
`

export const FriendName = styled.div`
  padding: 0.25rem 0.5rem;
`