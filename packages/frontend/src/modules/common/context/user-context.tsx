import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../../types/User";

interface IUserContext {
  userData: IUser | null;
  setUser: (user: IUser | null) => void;
}

const UserDataContext = createContext<IUserContext | null>(null);

export const UserDataProvider = ({ children }: any) => {
  const [userData, setUserData] = useState(null);

  const setUser = (user: any) => {
    setUserData(user);
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
