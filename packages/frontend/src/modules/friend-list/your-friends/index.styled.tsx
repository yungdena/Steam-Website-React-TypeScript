import styled from "styled-components";
import { COLORS } from "../../theme";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;
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
  width: 100%;
  min-height: 250px;
`

export const Friend = styled.div`

`

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