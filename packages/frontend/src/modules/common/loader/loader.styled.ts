import styled from "styled-components";
import { COLORS } from "../../theme";

export const LoaderContainer = styled.div`
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Spinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid;
  border-color: ${COLORS.grey} transparent ${COLORS.grey} transparent;
  border-radius: 50%;
  animation: spin-anim 0.8s linear infinite;

  @keyframes spin-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;