import { IUserContext } from "../../../common/context/user-context";
import { IApp } from "../../../common/types/app.interface";

export const fetchUserDataById = async (
  userId: string,
  getUserByIdMutation: { mutateAsync: (userId: string) => Promise<any> },
  setUserData: (userData: any) => void,
  setFriendsData: (friendData: any[]) => void,
  fetchFriendData: (
    friendIds: string[],
    getUserByIdMutation: { mutateAsync: (friendId: string) => Promise<any> },
    setFriendsData: (friendData: any[]) => void
  ) => Promise<void>
) => {
  try {
    const userData = await getUserByIdMutation.mutateAsync(userId);
    setUserData(userData);

    if (userData?.friends.length > 0) {
      fetchFriendData(userData.friends, getUserByIdMutation, setFriendsData);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const fetchFriendData = async (
  friendIds: string[],
  getUserByIdMutation: { mutateAsync: (friendId: string) => Promise<any>},
  setFriendsData: (friendData: any[]) => void
) => {
  const friendDataPromises = friendIds.map(async (friendId) => {
    try {
      const friend = await getUserByIdMutation.mutateAsync(friendId);
      return friend;
    } catch (error) {
      console.error(`Error fetching friend data for ID ${friendId}:`, error);
      return null;
    }
  });

  const friendData = await Promise.all(friendDataPromises);

  const filteredFriendData = friendData.filter((friend): friend is any => friend !== null);

  setFriendsData(filteredFriendData);
};

export const handleSendFriendRequest = (
  receiverId: string | undefined,
  UserDataContext: IUserContext | null,
  addFriendMutation: { mutate: (data: { senderId: string; receiverId: string }) => void },
  setRequestSent: (requestSent: boolean) => void
) => {
  if (UserDataContext && UserDataContext.userData) {
    const senderId = UserDataContext.userData._id;
    if (receiverId) {
      addFriendMutation.mutate({ senderId, receiverId });
      setRequestSent(true);
    }
  }
};

export const handleRemoveFriend = (
  receiverId: string | undefined,
  UserDataContext: IUserContext | null,
  removeFriendMutation: {
    mutate: (data: { senderId: string; receiverId: string }) => void;
  },
  setRequestSent: (requestSent: boolean) => void
) => {
  if (UserDataContext && UserDataContext.userData) {
    const senderId = UserDataContext.userData._id;
    if (receiverId) {
      removeFriendMutation.mutate({ senderId, receiverId });
      setRequestSent(true);
    }
  }
};

export const getAppById = (appId: string, appsData: IApp[]) => {
  return appsData.find((app) => app._id === appId);
};