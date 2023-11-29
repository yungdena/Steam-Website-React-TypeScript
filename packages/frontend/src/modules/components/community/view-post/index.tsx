import { useEffect, useRef, useState } from "react";

import { usePostsData } from "../../../common/context/community-context";
import { defaultAvatar } from "../../../common/consts/avatar";
import { useUserData } from "../../../common/context/user-context";
import { useAddCommentToPost, useAddLikeToPost } from "../../../common/services/community.service";
import { useGetUserById } from "../../../common/services/user.service";
import { IUser } from "../../../common/types/User";
import { PostImage, ImageBlock, InfoBlock, MainContainer, AuthorBlock, AuthorAvatar, AuthorName, PostText, ClosePost, Cross, LikesCount, ThumbsUpIcon, LikeButton, DislikeButton, CommentsBlock, MyComment, Comment, CommentNickname, CommentText, PostCommentWrap, PostCommentButton, AuthorSpan } from "./index.styled";
import { IComment, IPost } from "../../../common/types/Post.interface";
import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../../../common/consts";
import { handleAddComment, handleCommentTextChange, handleLikeClick, handleMainContainerClick } from "../utils/functions";

export const ViewPost = ({ post, setSelectedPost, setSelectedUser }: any) => {
  const { postsData, setPostsData, likedPosts, setLikedPosts } = usePostsData();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [commentText, setCommentText] = useState('');
  const [commentUsers, setCommentUsers] = useState<IUser[]>([]);
  const UserDataProvider = useUserData();
  const history = useHistory()
  const getUserByIdMutation = useGetUserById();
  const addLikeMutation = useAddLikeToPost()
  const addCommentMutation = useAddCommentToPost();

  const imageRef = useRef<HTMLImageElement>(null);
  const infoBlockRef = useRef<HTMLDivElement>(null);
  const imageBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCommentUsers = async () => {
      const usersPromises = postsData
        .find((p: IPost) => p._id === post._id)
        ?.comments.map((comment: IComment) =>
          getUserByIdMutation.mutateAsync(comment.user)
        );

      if (usersPromises && usersPromises.length > 0) {
        const resolvedUsers = await Promise.all(usersPromises);
        setCommentUsers(resolvedUsers);
      }
    };

    fetchCommentUsers();
  }, [post.comments, postsData]);

  useEffect(() => {
    if (imageRef.current && infoBlockRef.current && imageBlockRef.current) {
      const imageHeight = imageRef.current.clientHeight;
      infoBlockRef.current.style.height = `${imageHeight}px`;
      imageBlockRef.current.style.height = `${imageHeight}px`;
    }
  }, []);

  useEffect(() => {
    setUserLiked(likedPosts.includes(post._id));
  }, [likedPosts, post._id]);


  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      const user = await getUserByIdMutation.mutateAsync(post.user);
      if (isMounted && user) {
        setUserInfo(user);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [post.user]);

  return (
    <MainContainer onClick={(event) => handleMainContainerClick(event, setSelectedPost, setSelectedUser)}>
      <ImageBlock className="ImageBlock" ref={imageBlockRef}>
        <PostImage ref={imageRef} src={post.image} />
      </ImageBlock>
      <InfoBlock className="InfoBlock" ref={infoBlockRef}>
        <ClosePost>
          <Cross
            onClick={() => {
              setSelectedPost(null);
              setSelectedUser(null);
            }}
            src="https://res.cloudinary.com/didkbrlcz/image/upload/v1699858461/cross-svgrepo-com_1_n9mllx.svg"
          />
        </ClosePost>
        <AuthorBlock>
          <AuthorAvatar
            onClick={() =>
              history.push(
                "/" + APP_KEYS.ROUTER_KEYS.PROFILE + "/" + userInfo?._id
              )
            }
            src={userInfo?.avatar || defaultAvatar}
          />
          <AuthorName
            onClick={() =>
              history.push(
                "/" + APP_KEYS.ROUTER_KEYS.PROFILE + "/" + userInfo?._id
              )
            }
          >
            {userInfo?.name}
          </AuthorName>
        </AuthorBlock>
        <PostText>{post.title}</PostText>
        <PostText>{post.description}</PostText>
        <LikesCount>
          <ThumbsUpIcon src="https://community.cloudflare.steamstatic.com/public/images/sharedfiles/icons/icon_rate.png" />
          {postsData.find((p: IPost) => p._id === post._id)?.likes.count || 0}
        </LikesCount>
        <div style={{ display: "flex", margin: "0.5rem 0 0 0.5rem" }}>
          <LikeButton
            style={userLiked ? { backgroundPosition: "8px -60px" } : {}}
            onClick={() => handleLikeClick(post._id, userLiked, UserDataProvider, addLikeMutation, setUserLiked, likedPosts, post, setLikedPosts, setPostsData, postsData)}
          />
          <DislikeButton />
        </div>
        <CommentsBlock>
          {UserDataProvider?.userData?._id && (
            <Comment style={{ margin: 0 }}>
              <AuthorAvatar
                onClick={() =>
                  history.push(
                    "/" +
                      APP_KEYS.ROUTER_KEYS.PROFILE +
                      "/" +
                      UserDataProvider?.userData?._id
                  )
                }
                src={UserDataProvider?.userData?.avatar || defaultAvatar}
              />
              <MyComment
                onChange={(event) => handleCommentTextChange(event, setCommentText)}
                placeholder="Add a comment"
                value={commentText}
              />
            </Comment>
          )}
          {commentText && UserDataProvider?.userData?._id && (
            <PostCommentWrap>
              <PostCommentButton
                onClick={() =>
                  handleAddComment(
                    post._id,
                    UserDataProvider?.userData?._id || "",
                    commentText,
                    UserDataProvider,
                    addCommentMutation,
                    postsData,
                    setPostsData,
                    setCommentText,
                    commentText,
                    setCommentUsers
                  )
                }
              >
                Post Comment
              </PostCommentButton>
            </PostCommentWrap>
          )}
          {postsData
            .find((p: IPost) => p._id === post._id)
            ?.comments.map((comment: IComment, index: number) => (
              <Comment key={index}>
                <AuthorAvatar
                  onClick={() =>
                    history.push(
                      "/" + APP_KEYS.ROUTER_KEYS.PROFILE + "/" + comment.user
                    )
                  }
                  src={commentUsers[index]?.avatar || defaultAvatar}
                />
                <div style={{ marginLeft: "0.75rem" }}>
                  <CommentNickname
                    onClick={() =>
                      history.push(
                        "/" + APP_KEYS.ROUTER_KEYS.PROFILE + "/" + comment.user
                      )
                    }
                  >
                    {post.user === commentUsers[index]?._id ? (
                      <>{commentUsers[index]?.name} <AuthorSpan>author</AuthorSpan></>
                    ) : (
                      commentUsers[index]?.name || "Unknown"
                    )}
                  </CommentNickname>
                  <CommentText>{comment.text}</CommentText>
                </div>
              </Comment>
            ))
            .reverse()}
        </CommentsBlock>
      </InfoBlock>
    </MainContainer>
  );
};