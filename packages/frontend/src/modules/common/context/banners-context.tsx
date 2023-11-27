import { createContext, useContext, useEffect, useState } from "react";
import { useGetAllBanners } from "../services/banners.service";
import { IApp } from "../types/app.interface";

type BannersDataContextType = {
  bannersData: IApp[];
  isLoadingBanners: boolean;
};

const BannersDataContext = createContext<BannersDataContextType>({
  bannersData: [],
  isLoadingBanners: true,
});

export const BannersDataProvider = ({ children }: any) => {
  const [fetchCounter, setFetchCounter] = useState(0);
  const [bannersData, setBannersData] = useState([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);
  const getAllBannersMutation = useGetAllBanners();

  useEffect(() => {
    let isMounted = true;

    async function fetchAllBanners() {
      try {
        const data = await getAllBannersMutation.mutateAsync();
        if (isMounted) {
          setBannersData(data);
          setIsLoadingBanners(false);
          setFetchCounter((prevCounter) => prevCounter + 1);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
        if (isMounted) {
          setIsLoadingBanners(false);
        }
      }
    }

    fetchAllBanners();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <BannersDataContext.Provider value={{ bannersData, isLoadingBanners }}>
      {children}
    </BannersDataContext.Provider>
  );
};

export const useBannersData = () => {
  return useContext(BannersDataContext);
};
