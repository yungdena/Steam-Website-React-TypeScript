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
    async function fetchAllBanners() {
      const data = await getAllBannersMutation.mutateAsync();
      setBannersData(data);
      setIsLoadingBanners(false);
      setFetchCounter(fetchCounter + 1);
    }
    fetchAllBanners();
  }, []);

  console.log('Fetch Counter - Banners: ', fetchCounter);

  return (
    <BannersDataContext.Provider value={{ bannersData, isLoadingBanners }}>
      {children}
    </BannersDataContext.Provider>
  );
};

export const useBannersData = () => {
  return useContext(BannersDataContext);
};
