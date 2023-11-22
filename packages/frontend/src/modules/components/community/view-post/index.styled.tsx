import styled from "styled-components";
import { COLORS } from "../../../common/theme";

export const MainContainer = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.4);
  padding: 4rem;
  z-index: 9999;
`;

export const ImageBlock = styled.div`
  position: relative;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  width: 60%;
  border: 1px solid #304a66;
  border-right: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 9999;
`;

export const InfoBlock = styled.div`
  position: relative;
  top: 50%;
  right: 2px;
  transform: translateY(-50%);
  width: 40%;
  background-color: ${COLORS.communityGrey};
  border: 1px solid #304a66;
  border-left: 1px solid transparent;
  display: flex;
  flex-direction: column;
`;

export const PostImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  background-color: black;

  object-fit: contain;
`;

export const AuthorBlock = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  padding: 4px 0 4px 4px;
  margin-bottom: 4px;
  font-size: 11px;
  line-height: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  background-color: rgba(84, 133, 183, 0.2);
`;

export const AuthorAvatar = styled.img`
  width: 36px;
  height: 36px;
  margin: 0 0.25rem;
  cursor: pointer;
`

export const AuthorName = styled.div`
  color: #898989;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 13px;
  cursor: pointer;
`;

export const PostText = styled.div`
  font-family: "Motiva Sans", Sans-serif;
  font-weight: 300;
  font-size: 18px;
  color: #7cc5fb;
  font-style: italic;
  margin-top: 0px;
  margin-bottom: 4px;
  padding: 0 0.5rem;
`;

export const ClosePost = styled.div`
  position: absolute;
  top: -20px;
  right: -2px;
  width: calc(250% + 2px);
  height: 20px;
  background-color: #304a66;
`;

export const Cross = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 10px;
  height: 10px;
  cursor: pointer;
`

export const LikesCount = styled.div`
  display: flex;
  padding: 0 0.5rem;
  color: #7cc5fb;
  font-size: 12px;
  line-height: 16px;
`;

export const ThumbsUpIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`

export const LikeButton = styled.div`
  height: 30px;
  padding: 0px;
  padding-left: 32px;
  background-image: url(https://community.cloudflare.steamstatic.com/public/images/sharedfiles/rate_ico_up_tiled.png?v=1);
  background-position: 8px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  line-height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  margin-right: 5px;
  border-radius: 3px;
  -moz-border-radius: 3px;
  cursor: pointer;
  color: #939393;

  &:hover {
    background-position: 8px -30px;
    background-color: rgba( 102, 192, 244, 0.4 );
  }
`;

export const DislikeButton = styled.div`
  height: 30px;
  width: 32px;
  padding: 0px;
  background-image: url(https://community.cloudflare.steamstatic.com/public/images/sharedfiles/rate_ico_dn_tiled.png?v=1);
  background-position: 8px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  line-height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  margin-right: 5px;
  border-radius: 3px;
  -moz-border-radius: 3px;
  cursor: pointer;
  color: #939393;

  &:hover {
    background-color: rgba(102, 192, 244, 0.4);
    background-position: 8px -30px;
  }
`;

export const CommentsBlock = styled.div`
  border-top: 1px solid #304a66;
  min-height: 30%;
  margin: 0.5rem;
  padding: 0.5rem 0;
  overflow: auto;

    &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const MyComment = styled.textarea`
  all: unset;
  border: none;
  padding: 4px 6px 4px 6px;
  margin-left: 0.75rem;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  border-left: 1px solid #000;
  border-top: 1px solid #000;
  border-right: 1px solid #354357;
  border-bottom: 1px solid #354357;
  overflow: hidden;
  height: 28px;
  width: 100%;
  resize: none;
  color: #bfbfbf;
`;

export const Comment = styled.div`
  display: flex;

  margin-top: 1.5rem;
`

export const PostCommentWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`

export const PostCommentButton = styled.div`
  border-radius: 2px;
  border: none;
  padding: 1px 15px;
  font-size: 13px;
  margin-top: 4px;
  display: inline-block;
  cursor: pointer;
  color: #d2e885;
  background: linear-gradient(to bottom, #a4d007 5%, #536904 95%);

  &:hover {
    background: linear-gradient(to bottom, #b6d908 5%, #80a006 95%);
    color: #fff;
  }
`;

export const CommentNickname = styled.div`
  color: #ebebeb;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 5px;
`;

export const CommentText = styled.div`
  font-size: 13px;
  color: #acb2b8;
  word-wrap: break-word;
  overflow-y: auto;
  max-height: 400px;
  line-height: 18px;
`;

export const AuthorSpan = styled.span`
  font-size: 11px;
  color: gold;
  border: 1px solid gold;
  border-radius: 2px;
  padding: 1px;
  margin-left: 1px;
`;