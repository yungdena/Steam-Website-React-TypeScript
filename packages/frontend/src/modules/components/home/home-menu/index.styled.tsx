import styled from "styled-components";
import { COLORS } from "../../../common/theme";

export const RecentContainer = styled.div`
  position: absolute;
  background: radial-gradient(
    circle at 0%,
    rgba(83, 111, 134, 0) 20%,
    rgba(83, 111, 134, 0.25) 100%
  );
  padding: 15px 2px 15px 2px;
  width: 180px;
  left: -200px;
  top: 576px;

  @media (max-width: 1500px) {
    left: -80px;
  }
`;

export const TagTitle = styled.div`
  color: #536f86;
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 7px;
`;

export const TagLink = styled.div`
  width: fit-content;
  color: #7a8b9d;
  font-size: 12px;
  line-height: 16px;
  margin: 3px 0;
  cursor: pointer;

  &:hover {
    color: ${COLORS.tagBlue}
  }
`;