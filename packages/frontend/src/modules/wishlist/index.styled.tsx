import styled from "styled-components";
import { COLORS } from "../theme";

export const Background = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.storeBlue};
  padding-top: 10rem;
`

export const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 1050px;
  min-height: 10rem;
`

export const WishlistTitle = styled.div`
  color: #fff;
  font-size: 26px;
  text-transform: uppercase;
`;

export const WishlistItem = styled.div`
  color: ${COLORS.greyishWhite};
  will-change: transform, top;
  overflow: hidden;
  display: flex;
  padding: 1rem;
  background-color: rgba(64, 81, 99, 0.9);
  color: #b2b8bd;
  margin-bottom: 10px;
  width: 100%;
  transition: background-color 300ms, top 300ms;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: 200;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 0;
`;

export const ItemImage = styled.img`
  width: 292px;
  height: 136px;
  margin-right: 1rem;
`;

export const ItemTitle = styled.div`
  color: #fff;
  font-size: 22px;
  font-weight: 400;
  margin: 0 0 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: 140px auto;
  grid-template-rows: 1rem auto;
  margin-bottom: 10px;
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 11px;
  gap: 0;
  width: 352px;
`;

export const StatsLabel = styled.div`
`

export const Capsule = styled.div`
  display: flex;
  flex-direction: column;
`

export const MidContainer = styled.div`
  display: flex;
  width: 712px;
  position: relative;

  .wishlist-wrap {
    height: 36px;
    top: 0;
    right: 0;
    margin-left: 7rem;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const WishlistContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NoItems = styled.div`
  color: ${COLORS.greyishWhite};
`;

export const TagsContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`

export const Tag = styled.div`
  display: inline-block;
  margin-right: 3px;
  padding: 2px 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #8f98a0;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1)
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
  z-index: 9999;

  .App {
    z-index: 9999;
    height: 40px;
  }

  .title {
    text-align: center;
  }

  .custom-select-container {
    display: inline-block;
    min-width: 160px;
    text-align: center;
    position: relative;
  }

  .selected-text {
    background-color: #3d4450;
    color: white;
    padding: 8px 20px;
    height: 40px;
    border-radius: 2px;
  }

  .selected-text::after {
    content: "";
    position: absolute;
    right: 10px;
    top: 16px;
    border: 7px solid transparent;
    border-color: #fff transparent transparent transparent;
  }

  .selected-text.active::after {
    top: 8px;
    border-color: transparent transparent #fff transparent;
  }

  ul {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .select-options {
    position: absolute;
    width: 100%;
  }

  li {
    list-style-type: none;
    padding: 6px 20px;
    background: #3d4450;
    cursor: pointer;
    color: white;
  }

  li:hover {
    background-color: ${COLORS.greyishWhite};
    color: black;
  }
`;

export const SearchBar = styled.input`
  margin-right: 20px;
  padding: 7px 10px;
  width: 650px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid #000;
  color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5) inset,
    1px 1px 0 0 rgba(255, 255, 255, 0.2);

  &::placeholder {
    font-size: 14px;
  }
`;