import { ImgHTMLAttributes } from "react";
import styled from "styled-components";

interface ImageSmallProps extends ImgHTMLAttributes<HTMLImageElement> {
  selected: boolean;
}

export const BigImageWrapper = styled.div`
  height: 20.5rem;
`;

export const ImageBig = styled.img`
  width: 37.5rem;
  height: 21rem;
  margin: 0;
  opacity: 0;
  transition: all 0.3s ease-in-out;
`;

export const ImageSmall = styled.img<ImageSmallProps>`
  height: 4rem;
  margin: 0;
  width: 100%;
  position: relative;
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
  border: ${(props) =>
    props.selected ? "2px solid white" : "2px solid transparent"};
`;

export const SwiperContainer = styled.div`
  padding-right: 14px;
  position: relative;
  height: 4rem;
  width: 100%;

  .swiper-scrollbar-drag {
    :hover {
      background: linear-gradient(135deg, #3d6c8d 0%, #2e5470 100%);
      cursor: pointer;
    }
  }

  .swiper-button-prev {
    all: unset;
    border-radius: 2px;
    position: absolute;
    bottom: -9px;
    left: 4px;
    width: 38px;
    height: 18px;
    transform: translateY(-50%);
    cursor: pointer;
    background: rgba(35, 60, 81, 0.4);

    &::before {
      position: absolute;
      left: 50%;
      transform: translateX(-50%) scaleX(-1);
      content: "➤";
      color: #407899;
      font-size: 12px;
    }

    &:hover {
      &::before {
        color: white;
      }
    }
  }

  .swiper-button-next {
    all: unset;
    position: absolute;
    bottom: -8px;
    right: 4px;
    width: 38px;
    height: 18px;
    transform: translateY(-50%);
    cursor: pointer;
    background: rgba(35, 60, 81, 0.4);

    &::before {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      content: "➤";
      color: #407899;
      font-size: 12px;
    }

    &:hover {
      &::before {
        color: white;
      }
    }
  }

  .swiper-button-next:hover {
    background: linear-gradient(135deg, #3d6c8d 0%, #2e5470 100%);
  }

  .swiper-button-prev:hover {
    background: linear-gradient(135deg, #3d6c8d 0%, #2e5470 100%);
  }

  --swiper-scrollbar-bg-color: rgba(0, 0, 0, 0.2);
  --swiper-scrollbar-border-radius: 2px;
  --swiper-scrollbar-bottom: 0;
  --swiper-scrollbar-size: 18px;
  --swiper-scrollbar-sides-offset: 7.5%;
  --swiper-scrollbar-drag-bg-color: rgba(35, 60, 81, 0.4);
`;

export const ImageContainer = styled.div<ImageSmallProps>`
  height: 5rem;
  width: 100%;
  position: relative;
  z-index: 100;
  padding-top: 12px;

  &::before {
    z-index: 22;
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 13px 12px 13px;
    border-color: transparent transparent white transparent;
    opacity: ${(props) => (props.selected ? 1 : 0)};
  }
`;

export const SwiperNavigationButton = styled.div`
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  transform: translateY(-50%);
  cursor: pointer;
  background-color: #3498db;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  &::before {
    content: "➤";
    color: white;
    font-size: 16px;
  }
`;