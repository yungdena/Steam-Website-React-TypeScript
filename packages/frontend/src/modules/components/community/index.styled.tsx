import { HTMLAttributes } from "react";
import styled from "styled-components";
import { COLORS } from "../../common/theme";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${COLORS.storeBlue};
  padding-top: 6.5rem;
  padding-bottom: 6.5rem;
`;

export const CommunitySubtitle = styled.div`
  font-weight: normal;
  font-size: 17px;
  color: #9099a1;
  font-family: Arial, Sans-Serif;
  text-align: left;
  line-height: 15px;
`;

export const CommunityTitle = styled.div`
  font-size: 26px;
  color: #ffffff;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  text-align: left;
  line-height: 25px;
`;

export const CommunityInfoContainer = styled.div`
  position: relative;
  min-height: 210px;
  padding: 10px;
  margin-top: 15px;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid transparent;
  float: left;
`;

export const JoinSteamButton = styled.div`
  margin-left: 10px;
  border-radius: 2px;
  border: none;
  padding: 5px 15px;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  color: #d2e885;
  background: linear-gradient(to bottom, #a4d007 1%, #536904 99%);
  &:hover {
    color: #fff;
    background: linear-gradient(to bottom, #b6d908 5%, #80a006 95%);
  }
`;

export const CommunityInfoText = styled.div`
  font-size: 13px;
  line-height: 17px;
  color: #c6d4df;
  margin: 5px 10px;
  height: 20px;
`;

export const RecentTitle = styled.div`
  margin-right: 12.1rem;
  font-size: 11px;
  color: #8f98a0;
  text-transform: uppercase;
  padding-bottom: 10px;
  width: 100%;
`;

export const PopularGamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 220px;
  width: 70%;
  flex-wrap: wrap;
  padding: 2px;
`;

export const PopularGameItem = styled.div`
  height: 46px;
  width: 269px;
`;

export const PopularGameDescription = styled.div`
  font-size: 12px;
  line-height: 15px;
  color: #2f89bc;
  cursor: pointer;
`;

export const PopularGameTitle = styled.div`
  line-height: 15px;
  font-size: 13px;
  color: #dadada;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1050px;
  margin: 5rem auto;
`;

export const Post = styled.div`
  background-color: #0d131b;
  border: 1px solid transparent;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 16px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${COLORS.tagBlue};
  }
`;

export const PostImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const PostData = styled.div`
  width: 100%;
  height: 45px; 
`

export const PostTitle = styled.div`
  color: #636363;
  font-size: 12px;
  padding: 5px;
`

export const Author = styled.div`
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid #272f38;
`;

export const UserAvatar = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`

export const UserName = styled.div`
  padding-top: 7px;
  font-size: 13px;
  font-family: Motiva Sans, Arial, Helvetica, sans-serif;
  color: #636363;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 8px;
  margin-bottom: 8px;
`;

export const CreatePost = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 6rem;
  background: linear-gradient(to right, #47bfff 5%, #1a44c2 60%);
  background-position: 25%;
  background-size: 330% 100%;
  color: white;
  text-align: center;
  font-size: 1.25rem;
  width: 23rem;
  height: 3.125rem;
  padding: 3px 20px;
  border-radius: 3px;
  border: none;
  cursor: pointer;

  :hover {
    background: linear-gradient(to right, #47bfff 1%, #1a44c2 70%);
  }
`;