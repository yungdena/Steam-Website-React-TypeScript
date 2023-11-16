import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetAllApps, useGetDiscounts } from "../services/apps.service";
import { IApp } from "../types/app.interface";

type AppsDataContextType = {
  discountApps: IApp[];
  isLoadingDiscounts: boolean;
};

const DiscountDataContext = createContext<AppsDataContextType>({
  discountApps: [],
  isLoadingDiscounts: true,
});

export const DiscountDataProvider = ({ children }: any) => {
  const [discountApps, setAppsData] = useState([]);
  const [isLoadingDiscounts, setIsLoadingApps] = useState(true);

  const getDiscountsMutation = useGetDiscounts();

  useEffect(() => {
    async function fetchDiscounts() {
      try {
        const data = await getDiscountsMutation.mutateAsync();
        setAppsData(data);
        setIsLoadingApps(false);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    }
    fetchDiscounts();
  }, []);

  const contextValue: AppsDataContextType = {
    discountApps,
    isLoadingDiscounts
  };

  return (
    <DiscountDataContext.Provider value={contextValue}>
      {children}
    </DiscountDataContext.Provider>
  );
};

export const useDiscountData = () => {
  return useContext(DiscountDataContext);
};
