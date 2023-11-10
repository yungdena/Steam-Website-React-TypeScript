import { useEffect, useRef, useState } from "react";
import { defaultAvatar } from "../../../common/consts/avatar";
import { useGetUserById } from "../../../common/services/user.service";
import { IUser } from "../../../common/types/User";
import { PostImage, ImageBlock, InfoBlock, MainContainer, AuthorBlock, AuthorAvatar, AuthorName, PostText } from "./index.styled";

export const ViewPost = ({ post, user, setSelectedPost, setSelectedUser }: any) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const getUserByIdMutation = useGetUserById();

  const imageRef = useRef<HTMLImageElement>(null);
  const infoBlockRef = useRef<HTMLDivElement>(null);
  const imageBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current && infoBlockRef.current && imageBlockRef.current) {
      const imageHeight = imageRef.current.clientHeight;
      infoBlockRef.current.style.height = `${imageHeight}px`;
      imageBlockRef.current.style.height = `${imageHeight}px`;
    }
  }, []);

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


  console.log(userInfo)

  return (
    <MainContainer
      onClick={() => {
        setSelectedPost(null);
        setSelectedUser(null);
      }}
    >
      <ImageBlock ref={imageBlockRef}>
        <PostImage ref={imageRef} src={post.image} />
      </ImageBlock>
      <InfoBlock ref={infoBlockRef}>
        <AuthorBlock>
          <AuthorAvatar src={userInfo?.avatar || defaultAvatar} />
          <AuthorName>{userInfo?.name}</AuthorName>
        </AuthorBlock>
        <PostText>{post.title}</PostText>
        <PostText>{post.description}</PostText>
      </InfoBlock>
    </MainContainer>
  );
};