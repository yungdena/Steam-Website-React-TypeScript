import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { RemoveScroll } from "react-remove-scroll";

import { usePostsData } from "../../common/context/community-context";
import { LoaderBig } from "../../common/loader/loader";
import { Header } from "../header"
import { Footer } from "../home/footer"
import { Author, Background, CommunityInfoContainer, CommunityInfoText, CommunitySubtitle, CommunityTitle, CreatePost, JoinSteamButton, MainContainer, PopularGameDescription, PopularGameItem, PopularGamesContainer, PopularGameTitle, Post, PostData, PostImage, PostTitle, RecentTitle, UserAvatar, UserName } from "./index.styled"
import { APP_KEYS } from "../../common/consts";
import { useUserData } from "../../common/context/user-context";
import { getAppById } from "../profile/utils/functions";
import { useAppsData } from "../../common/context/apps-context";
import { useGetUserById } from "../../common/services/user.service";
import { IUser } from "../../common/types/User";
import { defaultAvatar } from "../../common/consts/avatar";
import { IPost } from "../../common/types/Post.interface";
import { ViewPost } from "./view-post";

export const Community = () => {
  const UserDataContext = useUserData();
  const [users, setUsers] = useState<IUser[]>([])
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { appsData } = useAppsData();
  const { isLoadingPosts, postsData } = usePostsData();
  const history = useHistory();
  const getUserByIdMutation = useGetUserById();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersPromises = postsData.map((post) =>
        getUserByIdMutation.mutateAsync(post.user)
      );

      if (usersPromises) {
        const resolvedUsers = await Promise.all(usersPromises);
        setUsers(resolvedUsers);
      }
    };

    fetchUsers();
  }, [postsData]);

  return (
    <>
      <Header />
      <Background>
        <div style={{ position: "relative" }}>
          {isLoadingPosts && users.length > 0 ? (
            <LoaderBig />
          ) : (
            <MainContainer className="grid-container">
              <CommunityTitle>Community Activity</CommunityTitle>
              <CommunitySubtitle>
                Community and official content for all games and software on
                Steam.
              </CommunitySubtitle>
              <CommunityInfoContainer>
                {UserDataContext?.userData ? (
                  <>
                    <RecentTitle>YOUR RECENTLY ADDED GAMES</RecentTitle>
                    <RecentTitle>NEW STEAM GAMES</RecentTitle>
                    <PopularGamesContainer>
                      {UserDataContext.userData.apps
                        .slice(
                          UserDataContext.userData.apps.length - 4,
                          UserDataContext.userData.apps.length
                        )
                        .reverse()
                        .map((appId) => {
                          const app = getAppById(appId, appsData);
                          if (app) {
                            return (
                              <PopularGameItem>
                                <PopularGameTitle>{app.title}</PopularGameTitle>
                                <PopularGameDescription
                                  onClick={() =>
                                    history.push(
                                      "/" +
                                        APP_KEYS.ROUTER_KEYS.APPS +
                                        "/" +
                                        app._id
                                    )
                                  }
                                >
                                  To App Page
                                </PopularGameDescription>
                              </PopularGameItem>
                            );
                          }
                        })}
                      {appsData
                        .slice(appsData.length - 4, appsData.length)
                        .reverse()
                        .map((app) => (
                          <PopularGameItem key={app._id}>
                            <PopularGameTitle>{app.title}</PopularGameTitle>
                            <PopularGameDescription
                              onClick={() =>
                                history.push(
                                  "/" +
                                    APP_KEYS.ROUTER_KEYS.APPS +
                                    "/" +
                                    app._id
                                )
                              }
                            >
                              To App Page
                            </PopularGameDescription>
                          </PopularGameItem>
                        ))}
                    </PopularGamesContainer>
                    <CommunitySubtitle
                      style={{
                        lineHeight: "20px",
                        position: "absolute",
                        top: "1rem",
                        right: 0,
                        width: "24rem",
                      }}
                    >
                      In Community Page you can add post <br /> with whatever
                      image, title, description you want.
                      <br /> Share your thoughts and ideas.
                    </CommunitySubtitle>
                    <CreatePost
                      onClick={() =>
                        history.push(
                          "/" +
                            APP_KEYS.ROUTER_KEYS.COMMUNITY +
                            "/" +
                            APP_KEYS.ROUTER_KEYS.CREATE
                        )
                      }
                    >
                      Create Your Own Post
                    </CreatePost>
                  </>
                ) : (
                  <>
                    <CommunityInfoText>
                      Welcome to the Steam Community
                    </CommunityInfoText>
                    <CommunityInfoText>
                      Log in to the Steam Community to find more Hubs to browse.
                    </CommunityInfoText>
                    <br />
                    <div style={{ display: "flex" }}>
                      <JoinSteamButton
                        onClick={() =>
                          history.push("/" + APP_KEYS.ROUTER_KEYS.SIGNIN)
                        }
                      >
                        Sign In
                      </JoinSteamButton>
                      <CommunityInfoText>or</CommunityInfoText>
                      <JoinSteamButton
                        onClick={() =>
                          history.push("/" + APP_KEYS.ROUTER_KEYS.SIGNUP)
                        }
                      >
                        Join Steam
                      </JoinSteamButton>
                    </div>
                  </>
                )}
              </CommunityInfoContainer>
              <ImageList variant="masonry" cols={3} gap={8}>
                {postsData.map((post) => {
                  const user = users.find((author) => author._id === post.user);
                  return post.image ? (
                    <ImageListItem
                      onClick={() => {
                        setSelectedPost(post);
                        setSelectedUser(post.user);
                      }}
                      key={post.image}
                    >
                      <Post className="post-item">
                        <PostImage src={post.image} />
                        <PostData>
                          <PostTitle>{post.title}</PostTitle>
                          <Author>
                            <UserAvatar
                              src={(user && user.avatar) || defaultAvatar}
                            />
                            <UserName>{user && user.name}</UserName>
                          </Author>
                        </PostData>
                      </Post>
                    </ImageListItem>
                  ) : (
                    <ImageListItem key={post._id}>
                      <Post
                        style={{ minWidth: "333px", minHeight: "120px" }}
                        className="post-item"
                      >
                        <PostData>
                          <PostTitle>{post.title}</PostTitle>
                          <Author>
                            <UserAvatar
                              src={(user && user.avatar) || defaultAvatar}
                            />
                            <UserName>{user && user.name}</UserName>
                          </Author>
                        </PostData>
                      </Post>
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </MainContainer>
          )}
          {selectedPost && (
            <RemoveScroll>
              <ViewPost
                post={selectedPost}
                user={selectedUser}
                setSelectedPost={setSelectedPost}
                setSelectedUser={setSelectedUser}
              />
            </RemoveScroll>
          )}
        </div>
      </Background>
      <Footer />
    </>
  );
}