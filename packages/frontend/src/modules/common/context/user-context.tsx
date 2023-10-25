import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../types/User";
import { APP_KEYS } from "../consts";
import { useGetUserById } from "../services/user.service";

export interface IUserContext {
  userData: IUser | null;
  setUser: (user: IUser | null) => void;
}

const UserDataContext = createContext<IUserContext | null>(null);

export const UserDataProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const getUserByIdMutation = useGetUserById();

  useEffect(() => {
    const storedUserId = localStorage.getItem(APP_KEYS.STORAGE_KEYS.ACCOUNT);
    async function fetchUserById(userId: string | null) {
      if (userId) {
        const data = await getUserByIdMutation.mutateAsync(
          JSON.parse(userId)
        );

        setUserData(data);
      }
    }

    if (storedUserId) {
      fetchUserById(storedUserId)
    }
  }, []);

  const setUser = (user: IUser | null) => {
    setUserData(user);
    localStorage.setItem(APP_KEYS.STORAGE_KEYS.ACCOUNT, JSON.stringify(user?._id));
  };

  return (
    <UserDataContext.Provider value={{ userData, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
