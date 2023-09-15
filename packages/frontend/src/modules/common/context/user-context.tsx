import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../../types/User";
import { useGetUserById } from "../services/user.service";

const UserDataContext = createContext<IUser | null>(null);

export const UserDataProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [fetchCounter, setFetchCounter] = useState(0);
  const getUserByIdMutation = useGetUserById();

  const userIdLocal = localStorage.getItem("account");
  const userIdSession = sessionStorage.getItem("account");

  useEffect(() => {
    async function fetchUserById(userId: string | null) {
      if (userId) {
        const data = await getUserByIdMutation.mutateAsync(JSON.parse(userId));
        
        setUserData(data);
        setFetchCounter(fetchCounter + 1);
      }
    }

    if (userIdSession) {
      fetchUserById(userIdSession);
    } else if (userIdLocal) {
      fetchUserById(userIdLocal);
    }
  }, [userIdSession, userIdLocal]);
  console.log("Context userData: ", userData);
  console.log("Fetch Counter - User: ", fetchCounter);

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
