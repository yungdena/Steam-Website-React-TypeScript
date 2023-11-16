import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetLibrary } from "../services/user.service";
import { IApp } from "../types/app.interface";

type AppsDataContextType = {
  libraryApps: { library: IApp[] };
  isLoadingLibrary: boolean;
};

const LibraryDataContext = createContext<AppsDataContextType>({
  libraryApps: { library: [] },
  isLoadingLibrary: true,
});

export const LibraryDataProvider = ({ children, userId }: any) => {
  const [libraryApps, setAppsData] = useState<{ library: IApp[] }>({
    library: [],
  });
  const [isLoadingLibrary, setIsLoadingApps] = useState(true);

  const getLibraryMutation = useGetLibrary();

  useEffect(() => {
    async function fetchLibrary() {
      try {
        const data = await getLibraryMutation.mutateAsync(userId);
        setAppsData(data);
        setIsLoadingApps(false);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    }
    fetchLibrary();
  }, [userId]);

  const contextValue: AppsDataContextType = {
    libraryApps,
    isLoadingLibrary,
  };

  return (
    <LibraryDataContext.Provider value={contextValue}>
      {children}
    </LibraryDataContext.Provider>
  );
};

export const useLibraryData = () => {
  const { libraryApps, isLoadingLibrary } = useContext(LibraryDataContext);

  return { libraryApps: libraryApps.library || [], isLoadingLibrary };
};