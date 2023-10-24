import styled from "styled-components";
import { COLORS } from "../../../../common/theme";

export const FooterContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${COLORS.darkBlueGrey};
  padding: 1rem 0 3.75rem 0;

  @media (min-height: 500px) {
    height: 85vh;
  }

  @media (min-height: 726px) {
    height: 60vh;
  }

  @media (min-height: 960px) {
    height: 45vh;
  }
`;

export const ContentContainer = styled.div`
  margin: 0 auto;
  padding-top: 1rem;
  width: 58.75rem;
  color: ${COLORS.lightGrey}
  font-size: 0.75rem;
`;

export const UpperContainer = styled.div`
  display: flex;
  padding: 0.5rem 0 0.75rem 0;
  align-items: center;
  border-top: 1px solid ${COLORS.grey};
  border-bottom: 1px solid ${COLORS.grey};
`;

export const LowerContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0.5rem 0 0.75rem 0;
`;

export const ImageLeft = styled.img`
  width 5.5rem;
  height 1.5rem;
  margin-right: 0.5rem;
`;

export const ImageRight = styled.img`
  width 5.75rem;
  height 1.625rem;
  margin-left: 1rem;
`;

export const FooterText = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  color: ${COLORS.lightGrey}
`

export const FooterTextBig = styled.div`
  font-size: 0.875rem;
  width: 12.5rem;
  color: ${COLORS.lightGrey};
  margin-bottom: 0.5rem;
`;

export const FooterLink = styled.div`
  font-size: 0.8rem;
  color: ${COLORS.lightBlue};
  cursor: pointer;
  position: relative;

  :hover {
    color: ${COLORS.white};
  }

  :after {
    content: "";
    position: absolute;
    top: 50%;
    right: -1rem;
    transform: translateY(-50%);
    height: 1rem;
    width: 1px;
    background-color: ${COLORS.grey};
  }
`;

export const FooterLinkBig = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  font-size: 0.875rem;
  color: ${COLORS.white};
  cursor: pointer;
`;

export const JoinSteamContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 11.5rem;
  margin-bottom: 6rem;
`;

export const LeftSide = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`

export const RightSide = styled.div`
  display: flex;
  width: 12.5rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const Image = styled.img`
  width: 12.5rem;
  height: 8.5rem;
`

export const Button = styled.button`
  width: 6.875rem;
  height: 2.125rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  padding: 0 1rem;
  border-radius: 2px;
  margin-bottom: 0.625rem;

  :hover {
    border: 1.5px solid rgba(255, 255, 255, 1);
  }
`;