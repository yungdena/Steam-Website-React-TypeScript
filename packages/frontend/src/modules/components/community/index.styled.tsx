import styled from "styled-components";
import { COLORS } from "../../common/theme";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${COLORS.storeBlue};
  padding-top: 6.5rem;
`

export const CommunityTitle = styled.div`
  font-size: 26px;
  color: #FFFFFF;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  text-align: left;
`;

export const MainContainer = styled.div`
  display: flex;
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
  width: fit-content;
  padding: 16px;
`;

export const PostImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const PostData = styled.div`
  display: flex;
  width: 100%;
  height: 45px; 
`

export const PostTitle = styled.div`
  color: #636363;
  font-size: 12px;
  padding: 5px;
`