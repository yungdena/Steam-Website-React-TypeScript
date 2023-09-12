import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetAllApps } from "../services/apps.service";
import { IApp } from "../types/app.interface";

type AppsDataContextType = {
  appsData: IApp[];
  isLoadingApps: boolean;
};

const AppsDataContext = createContext<AppsDataContextType>({
  appsData: [],
  isLoadingApps: true,
});

export const AppsDataProvider = ({ children }: any) => {
  const [appsData, setAppsData] = useState([]);
  const [isLoadingApps, setIsLoadingApps] = useState(true);
  const getAllAppsMutation = useGetAllApps()

  useEffect(() => {
      async function fetchAllApps() {
        const data = await getAllAppsMutation.mutateAsync();
        setAppsData(data);
        setIsLoadingApps(false);
      }
      fetchAllApps();
    }, []);

  return (
    <AppsDataContext.Provider value={{ appsData, isLoadingApps }}>
      {children}
    </AppsDataContext.Provider>
  );
};

export const useAppsData = () => {
  return useContext(AppsDataContext);
};
