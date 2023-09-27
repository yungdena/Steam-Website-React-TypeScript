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
  background: rgba( 0, 0, 0, 0.2);
  min-height: 56px;
  margin-top: 8px;
`

export const NoInvites = styled.div`
  font-size: 17px;
  color: ${COLORS.lightGrey};
`;

export const InviteContainer = styled.div`
  width: 10rem;
  height 2rem;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.darkBlueGrey};
`

export const InviteSender = styled.div`
  color: ${COLORS.greyText};
`