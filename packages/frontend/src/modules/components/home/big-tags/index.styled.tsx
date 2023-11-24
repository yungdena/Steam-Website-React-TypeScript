import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  gap: 16px;
  min-height: 280px;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  padding: 0 5rem;
  position: relative;
  right: 4.8rem;
  @media (max-width: 1500px) {
    left: -12.5rem;
  }

  .swiper-button-next {
    top: 42%;
    right: -4px;
  }

  .swiper-button-prev {
    top: 42%;
    left: -4px;
  }
`;

export const Title = styled.div`
  margin-left: 2rem;
  text-align: start;
  color: #ffffff;
  padding: 10px;
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 600;

  @media (max-width: 1500px) {
    margin-left: -5.5rem;
  }
`;

export const BigTagItem = styled.div`
  width: 250px;
  height: 250px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(105%);
  }
`

export const BigTagTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.1ch;
  color: white;
  text-shadow: 0 1px 3px rgb(0 0 0 / 50%);
  text-transform: uppercase;
  width: 100%;
  position: relative;
  top: 200px;
  text-align: center;
  z-index: 9999;
`;

export const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

export const StyledPagination = styled.div`
  z-index: 9999 !important;
  .swiper-pagination {
    transform: translateX(48.3%);
    display: flex;
    z-index: 9999 !important;

    .swiper-pagination-bullet {
      z-index: 9999 !important;
      display: inline-block;
      margin: 2px !important;
      width: 15px;
      height: 9px;
      border-radius: 2px;
      transition: background-color 0.5s;
      background-color: hsla(202, 60%, 100%, 0.2);
      cursor: pointer;

      &.swiper-pagination-bullet-active {
        background-color: hsla(202, 60%, 100%, 0.4);
      }
    }
  }
`;