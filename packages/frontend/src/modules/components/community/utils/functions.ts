import { APP_KEYS } from "../../../common/consts";
import { IPost } from "../../../common/types/Post.interface";

export const handleLikeClick = async (postId: string, userLiked: any, UserDataProvider: any, addLikeMutation: any, setUserLiked: any, likedPosts: any, post: any, setLikedPosts: any, setPostsData: any, postsData: any) => {
  if (!userLiked) {
    if (UserDataProvider?.userData?._id) {
      try {
        await addLikeMutation.mutateAsync({
          postId,
          userId: UserDataProvider.userData._id,
        });
        setUserLiked(true);

        const updatedLikedPosts = [...likedPosts, post._id];
        setLikedPosts(updatedLikedPosts);

        const updatedPostsData = postsData.map((p: IPost) =>
          p._id === post._id && UserDataProvider?.userData?._id
            ? {
                ...p,
                likes: {
                  ...p.likes,
                  count: p.likes.count + 1,
                  users: [...p.likes.users, UserDataProvider.userData._id],
                },
              }
            : p
        );
        setPostsData(updatedPostsData);
      } catch (error) {
        console.error("Error occurred while adding like:", error);
      }
    }
  }
};

export const handleCommentTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, setCommentText: any) => {
  const newText = e.target.value;
  setCommentText(newText);
};

export const handleMainContainerClick = (e: any, setSelectedPost: any, setSelectedUser: any) => {
  const clickedElement = e.target;
  if (
    clickedElement.closest(".InfoBlock") ||
    clickedElement.closest(".ImageBlock")
  ) {
    return;
  }

  setSelectedPost(null);
  setSelectedUser(null);
};


export const handleAddComment = async (
  postId: string,
  userId: string,
  commentText: string,
  UserDataProvider: any,
  addCommentMutation: any,
  postsData: any,
  setPostsData: any,
  setCommentText: any,
  commentUsers: any,
  setCommentUsers: any
) => {
  if (UserDataProvider?.userData?._id) {
    try {
      await addCommentMutation.mutateAsync({
        postId,
        userId,
        text: commentText,
      });
      const newComment = {
        user: UserDataProvider.userData._id,
        text: commentText,
      };
      const updatedPostsData = postsData.map((p: IPost) =>
        p._id === postId
          ? {
              ...p,
              comments: [...p.comments, newComment],
            }
          : p
      );
      setPostsData(updatedPostsData);
      if (UserDataProvider.userData) {
        setCommentUsers([...commentUsers, UserDataProvider.userData]);
      }
    } catch (error: any) {
      console.error("Error adding comment:", error.message);
    } finally {
      setCommentText("");
    }
  }
};

export const handleCreatePost = async (post: any, cloudinaryImageURL: any, setPost: any, history: any, createPostMutation: any) => {
  try {
    if (post) {
      setPost({ ...post, image: cloudinaryImageURL });

      const newPost = await createPostMutation.mutateAsync({
        postData: { ...post },
      });
      history.push(`/${APP_KEYS.ROUTER_KEYS.COMMUNITY}`);
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>, post: any, setPost: any) => {
  if (post) {
    setPost({ ...post, title: event.target.value });
  }
};

export const handleDescriptionChange = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  post: any,
  setPost: any
) => {
  if (post) {
    setPost({ ...post, description: event.target.value });
  }
};