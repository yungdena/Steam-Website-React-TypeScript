import { useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { usePostsData } from "../../common/context/community-context";
import { LoaderBig } from "../../common/loader/loader";
import { Header } from "../header"
import { Footer } from "../home/footer"
import { Background, CommunityTitle, MainContainer, Post, PostData, PostImage, PostTitle } from "./index.styled"

export const Community = () => {
  const { isLoadingPosts, postsData } = usePostsData();

  return (
    <>
      <Header />
      <Background>
        {isLoadingPosts ? (
          <LoaderBig />
        ) : (
          <MainContainer className="grid-container">
            <CommunityTitle>Community Activity</CommunityTitle>
            <ImageList variant="masonry" cols={3} gap={8}>
              {postsData.map((post) =>
                post.image ? (
                  <ImageListItem key={post.image}>
                    <Post className="post-item">
                      <PostImage src={post.image} />
                      <PostData>
                        <PostTitle>{post.title}</PostTitle>
                      </PostData>
                    </Post>
                  </ImageListItem>
                ) : (
                  <ImageListItem key={post._id}>
                    <Post style={{minWidth: '333px', minHeight: '120px'}} className="post-item">
                      <PostData>
                        <PostTitle>{post.title}</PostTitle>
                      </PostData>
                    </Post>
                  </ImageListItem>
                )
              )}
            </ImageList>
          </MainContainer>
        )}
      </Background>
      <Footer />
    </>
  );
}