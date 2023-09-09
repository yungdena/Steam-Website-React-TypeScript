import { useEffect, useState } from "react";
import { useGetAppById } from "../common/services/apps.service";
import { useGetWishlist } from "../common/services/user.service";
import { IApp } from "../common/types/app.interface";
import { Header } from "../header"
import { Footer } from "../home/footer"
import { Background, MainContainer, NoItems, WishlistItem } from "./index.styled"

export const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [apps, setApps] = useState<IApp[]>([]);
  const getWishlistMutation = useGetWishlist();
  const getAppByIdMutation = useGetAppById();

  useEffect(() => {
    async function getUsersWishlist() {
      const user = localStorage.getItem('account');
      if (user && wishlistIds.length === 0) {
        const id = JSON.parse(user)._id;
        const wishlistResponse = await getWishlistMutation.mutateAsync(id);
        setWishlistIds(wishlistResponse.wishlist);
      }
    }

    getUsersWishlist();
  }, []);

  useEffect(() => {
    async function getAppsFromWishlist() {
      try {
        if (wishlistIds.length > 0 && apps.length === 0) {
          const appsResponse = await Promise.all(
            wishlistIds.map((id) => getAppByIdMutation.mutateAsync(id))
          );
          setApps(appsResponse);
        }
      } catch (error) {
        console.error("Error fetching apps from wishlist:", error);
      }
    }

    getAppsFromWishlist();
  }, [wishlistIds]);

  return (
    <>
      <Header />
      <Background>
        <MainContainer>
          {apps.length > 0 ? (
            apps.map((item) => (
              <WishlistItem key={item._id}>
                {item.title}
              </WishlistItem>
            ))
          ) : (
            <NoItems>No apps in your wishlist.</NoItems>
          )}
        </MainContainer>
      </Background>
      <Footer />
    </>
  );
};

export default Wishlist;