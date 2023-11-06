import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetAllPosts } from "../services/community.service";
import { IPost } from "../types/Post.interface";

type PostsDataContextType = {
  postsData: IPost[];
  isLoadingPosts: boolean;
};

const PostsDataContext = createContext<PostsDataContextType>({
  postsData: [],
  isLoadingPosts: true,
});

export const PostsDataProvider = ({ children }: any) => {
  const [postsData, setPostsData] = useState([]);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const getAllPostsMutation = useGetAllPosts();

  useEffect(() => {
    async function fetchAllPosts() {
      const data = await getAllPostsMutation.mutateAsync();
      setPostsData(data);
      setIsLoadingPosts(false);
      setFetchCounter(fetchCounter + 1);
    }
    fetchAllPosts();
  }, []);

  return (
    <PostsDataContext.Provider value={{ postsData, isLoadingPosts }}>
      {children}
    </PostsDataContext.Provider>
  );
};

export const usePostsData = () => {
  return useContext(PostsDataContext);
};
