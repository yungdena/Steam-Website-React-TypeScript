import styled from "styled-components";
import { COLORS } from "../../theme";

export const MainContainer = styled.div`
  width: 920px;
  height: 612px;
  margin-top: 20px;
`

export const InvitesHeading = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #015e80;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
  color: #fff;
  font-weight: normal;
`;

export const InvitesContainer = styled.div`
  padding: 16px;
  font-size: 17px;
  background: rgba(0, 0, 0, 0.2);
  min-height: 56px;
  margin-top: 8px;
  overflow: auto;
`

export const NoInvites = styled.div`
  font-size: 17px;
  color: ${COLORS.lightGrey};
`;

export const InviteContainer = styled.div`
  width: 25rem;
  height 6rem;
  padding: 0.5rem;
  display: flex;
  background: rgba(0, 0, 0, 0.4);
`;

export const InviteSender = styled.div`
  color: ${COLORS.greyText};
  margin-left: 0.5rem;
`

export const Avatar = styled.img`
  height: 80px;
  width: 80px;
`

export const ButtonAccept = styled.div`
  background: linear-gradient(to right, #47bfff 0%, #1a44c2 60%);
  background-position: 25%;
  background-size: 330% 100%;
  border-radius: 3px;
  font-size: 14px;
  font-weight: normal;
  color: #f5f5f5;
  letter-spacing: 0.02em;
  padding: 5px 10px;
  margin: 1.5rem 0 0 auto;
  height: fit-content;
  width: fit-content;
  cursor: pointer;

  &:hover {
    filter: brightness(110%);
  }
`;

export const ButtonDecline = styled.div`
  background: linear-gradient(to right, #fa000c 0%, #740000 60%);
  background-position: 25%;
  background-size: 330% 100%;
  border-radius: 3px;
  font-size: 14px;
  font-weight: normal;
  color: #f5f5f5;
  letter-spacing: 0.02em;
  padding: 5px 10px;
  margin: 1.5rem 0 0 auto;
  height: fit-content;
  width: fit-content;
  cursor: pointer;

  &:hover {
    filter: brightness(110%);
  }
`;