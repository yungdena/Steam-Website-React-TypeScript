import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetWishlist } from "../services/user.service";
import { IApp } from "../types/app.interface";

type AppsDataContextType = {
  wishlistApps: { wishlist: IApp[] };
  isLoadingWishlist: boolean;
};

const WishlistDataContext = createContext<AppsDataContextType>({
  wishlistApps: { wishlist: [] },
  isLoadingWishlist: true,
});

export const WishlistDataProvider = ({ children, userId }: any) => {
  const [wishlistApps, setAppsData] = useState<{ wishlist: IApp[] }>({
    wishlist: [],
  });
  const [isLoadingWishlist, setIsLoadingApps] = useState(true);

  const getWishlistMutation = useGetWishlist();

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const data = await getWishlistMutation.mutateAsync(userId);
        setAppsData(data);
        setIsLoadingApps(false);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    }
    fetchWishlist();
  }, [userId]);

  console.log(wishlistApps)

  const contextValue: AppsDataContextType = {
    wishlistApps,
    isLoadingWishlist,
  };

  return (
    <WishlistDataContext.Provider value={contextValue}>
      {children}
    </WishlistDataContext.Provider>
  );
};

export const useWishlistData = () => {
  const { wishlistApps, isLoadingWishlist } = useContext(WishlistDataContext);

  return { wishlistApps: wishlistApps.wishlist || [], isLoadingWishlist };
};
