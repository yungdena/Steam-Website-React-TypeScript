import { ImgHTMLAttributes } from "react";
import styled from "styled-components";

interface ImageSmallProps extends ImgHTMLAttributes<HTMLImageElement> {
  selected: boolean;
}

export const ImageBig = styled.img`
  width: 37.5rem;
  height: 21rem;
  margin: 0;
  opacity: 0;
  transition: all 0.3s ease-in-out;

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
`;

export const ImageSmall = styled.img<ImageSmallProps>`
  height: 4rem;
  margin: 0;
  width: 95%;

  opacity: ${(props) => (props.selected ? 1 : 0.5)};
  transition: opacity 0.3s ease-in-out;
`;

export const SwiperContainer = styled.div`
  margin-top: 0.5rem;
`