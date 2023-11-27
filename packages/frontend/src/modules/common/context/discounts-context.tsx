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
    let isMounted = true;

    async function fetchDiscounts() {
      try {
        const data = await getDiscountsMutation.mutateAsync();
        if (isMounted) {
          setAppsData(data);
          setIsLoadingApps(false);
        }
      } catch (error) {
        console.error("Error fetching discounts:", error);
        if (isMounted) {
          setIsLoadingApps(false);
        }
      }
    }

    fetchDiscounts();

    return () => {
      isMounted = false;
    };
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
