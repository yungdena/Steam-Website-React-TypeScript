import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useGetAllApps } from "../services/apps.service";
import { IApp } from "../types/app.interface";

type AppsDataContextType = {
  appsData: IApp[];
  isLoadingApps: boolean;
  isLoadingNewApps: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPageError: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppsDataContext = createContext<AppsDataContextType>({
  appsData: [],
  isLoadingApps: true,
  isLoadingNewApps: true,
  setPage: () => {},
  page: 1,
  setPageError: () => {},
});

export const AppsDataProvider = ({
  children,
  page: propPage = 1,
  pageSize = 20,
}: any) => {
  const [appsData, setAppsData] = useState<IApp[]>([]);
  const [page, setPage] = useState(propPage);
  const [isLoadingApps, setIsLoadingApps] = useState(true);
  const [isLoadingNewApps, setIsLoadingNewApps] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const getAllAppsMutation = useGetAllApps(page, pageSize);

  useEffect(() => {
    setPage(propPage);
  }, [propPage]);

  useEffect(() => {
    let isMounted = true;

    async function fetchAllApps() {
      try {
        setIsLoadingNewApps(true);
        const data = await getAllAppsMutation.mutateAsync();
        if (isMounted) {
          setAppsData((prevAppsData) => [...prevAppsData, ...data]);
          setIsLoadingApps(false);
          setDataFetched(true);
        }
      } catch (error) {
        console.error("Error fetching apps:", error);
        if (isMounted) {
          setPageError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoadingNewApps(false);
        }
      }
    }

    fetchAllApps();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize]);

  const contextValue: AppsDataContextType = useMemo(() => {
    return {
      appsData,
      isLoadingApps,
      isLoadingNewApps,
      setPage,
      setPageError,
      page,
    };
  }, [appsData, isLoadingApps, isLoadingNewApps, setPage, setPageError, page]);

  return (
    <AppsDataContext.Provider value={contextValue}>
      {children}
    </AppsDataContext.Provider>
  );
};

export const useAppsData = () => {
  return useContext(AppsDataContext);
};