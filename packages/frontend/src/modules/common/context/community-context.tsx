import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useGetAllPosts } from "../services/community.service";
import { IPost } from "../types/Post.interface";
import { useUserData } from "./user-context";

type PostsDataContextType = {
  postsData: IPost[];
  setPostsData: React.Dispatch<React.SetStateAction<IPost[]>>;
  isLoadingPosts: boolean;
  likedPosts: string[];
  setLikedPosts: React.Dispatch<React.SetStateAction<string[]>>;
};

const PostsDataContext = createContext<PostsDataContextType>({
  postsData: [],
  setPostsData: () => {},
  isLoadingPosts: true,
  likedPosts: [],
  setLikedPosts: () => {},
});

export const PostsDataProvider = ({ children }: any) => {
  const [postsData, setPostsData] = useState<IPost[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const getAllPostsMutation = useGetAllPosts();
  const UserDataProvider = useUserData();
  const userDataId = UserDataProvider?.userData?._id;

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const data = await getAllPostsMutation.mutateAsync();
        if (isMounted.current) {
          setPostsData(data);
          setIsLoadingPosts(false);

          if (userDataId) {
            const userLikedPosts = userDataId
              ? data.filter((post: IPost) =>
                  post.likes.users.includes(userDataId)
                )
              : [];
            setLikedPosts(userLikedPosts.map((post: IPost) => post._id));
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchAllPosts();
  }, [userDataId]);

  return (  
    <PostsDataContext.Provider
      value={{
        postsData,
        setPostsData,
        isLoadingPosts,
        likedPosts,
        setLikedPosts,
      }}
    >
      {children}
    </PostsDataContext.Provider>
  );
};

export const usePostsData = () => {
  return useContext(PostsDataContext);
};