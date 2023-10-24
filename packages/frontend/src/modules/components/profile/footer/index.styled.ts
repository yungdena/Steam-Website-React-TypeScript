import styled from "styled-components";
import { COLORS } from "../../../common/theme";

export const FooterContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: black;
  padding: 1rem 0 3.75rem 0;
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
