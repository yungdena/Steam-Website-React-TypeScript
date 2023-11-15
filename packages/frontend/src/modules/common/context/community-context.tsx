import React, { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    async function fetchAllPosts() {
      const data = await getAllPostsMutation.mutateAsync();
      setPostsData(data);
      setIsLoadingPosts(false);
      if (userDataId) {
        const userLikedPosts = userDataId
          ? data.filter((post: IPost) => post.likes.users.includes(userDataId))
          : [];
        setLikedPosts(userLikedPosts.map((post: IPost) => post._id));
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