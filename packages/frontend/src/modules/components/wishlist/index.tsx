import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ButtonWrapper, PurchaseButton } from "../app-page/index.styled";
import { APP_KEYS } from "../../common/consts";
import { useAppsData } from "../../common/context/apps-context";
import { useUserData } from "../../common/context/user-context";
import { LoaderBig } from "../../common/loader/loader";
import { useGetAppById } from "../../common/services/apps.service";
import { useAddToLibrary, useDeleteFromWishlist } from "../../common/services/user.service";
import { IApp } from "../../common/types/app.interface";
import { calculateReviewTitle } from "../../common/utils/calculateReviewRate";
import { calculatePercentageDecrease } from "../../common/utils/countPercentage";
import { formatDate } from "../../common/utils/formatDate";
import { handleNavigate } from "../../common/utils/handleNavigate";
import { Header } from "../header"
import { Footer } from "../home/footer"
import { FinalPrice, OriginalPrice, PriceAmounts, PriceContainer, PricePercent } from "../home/offers/index.styled";
import { AppPrice } from "../store/app-list/index.styled";
import { handleSearch } from "../store/app-list/utils/handlers";
import { sortAppsByDiscount, sortAppsByLowestPrice, sortAppsByName, sortAppsByReleaseDate, sortAppsByReviews } from "../store/app-list/utils/sort-apps";
import { IUser } from "../../common/types/User";
import { Background, Capsule, ItemImage, ItemTitle, MainContainer, MidContainer, NoItems, RemoveButton, SearchBar, SearchContainer,  Stats, StatsLabel, Tag, TagsContainer, WishlistContainer, WishlistItem, WishlistTitle } from "./index.styled"
import { CustomSelect } from "./select/custom-select";
import Toast from "./toast";

export const Wishlist = () => {
  const [sortedApps, setSortedApps] = useState<IApp[]>([]);
  const [sortBy, setSortBy] = useState("Your Rank");
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const UserDataContext = useUserData();
  const { appsData } = useAppsData();
  const history = useHistory()
  const deleteAppFromWishlistMutation = useDeleteFromWishlist()
  const addToLibraryMutation = useAddToLibrary();

  const userWishlistIds = UserDataContext?.userData?.wishlist || [];
  const userWishlistApps = appsData.filter((app) =>
    userWishlistIds.includes(app._id)
  );

  useEffect(() => {
    setSortedApps(userWishlistApps);
    setIsLoading(false);
  }, [appsData, userWishlistIds]);

  useEffect(() => {
    let sortedAppsCopy = [...userWishlistApps];

    switch (sortBy) {
      case "Your Rank":
        break;
      case "Release Date":
        sortAppsByReleaseDate(sortedAppsCopy);
        break;
      case "Name":
        sortAppsByName(sortedAppsCopy);
        break;
      case "Price":
        sortAppsByLowestPrice(sortedAppsCopy);
        break;
      case "Review Score":
        sortAppsByReviews(sortedAppsCopy);
        break;
      case "Discount":
        sortAppsByDiscount(sortedAppsCopy);
        break;
      default:
        break;
    }

    if (searchInput) {
      const filteredApps = sortedAppsCopy.filter((app) =>
        app.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSortedApps(filteredApps);
    } else {
      setSortedApps(sortedAppsCopy);
    }

    setIsLoading(false);
  }, [appsData, userWishlistIds, sortBy, searchInput]);

  const handleSortChange = (selectedOption: string, setSortBy: any) => {
    setSortBy(selectedOption);
  };

  const handleDeleteFromWishlist = (appId: string) => {
    if (UserDataContext?.userData) {
      const userId = UserDataContext.userData._id;
      deleteAppFromWishlistMutation.mutateAsync({ userId, appId });

      setSortedApps((prevSortedApps) =>
        prevSortedApps.filter((app) => app._id !== appId)
      );

      if (UserDataContext?.userData) {
        const updatedUserData = { ...UserDataContext.userData } as IUser;
        updatedUserData.wishlist = updatedUserData.wishlist.filter(
          (id) => id !== appId
        );
        UserDataContext.setUser(updatedUserData);
      }
    }
  };

  const handleAddToLibrary = async (appId: string) => {
    const user = localStorage.getItem(APP_KEYS.STORAGE_KEYS.ACCOUNT);
    if (user) {
      const userId: string = JSON.parse(user);
      await addToLibraryMutation.mutateAsync({ userId, appId });
      setShowToast(true);

      const updatedUserData = { ...UserDataContext?.userData } as IUser | null;
      if (updatedUserData) {
        updatedUserData.apps.push(appId);
        UserDataContext?.setUser(updatedUserData);
        handleDeleteFromWishlist(appId);
      }
    } else {
      handleNavigate(
        history,
        APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN
      );
    }
  };

  const handleInputChange = (inputValue: string) => {
    setSearchInput(inputValue);
    handleSearch(inputValue, setSortedApps, sortedApps);
  };

  console.log("userData in Wishlist", UserDataContext?.userData);

  return (
    <>
      <Header />
      <Background>
        <MainContainer>
          <WishlistTitle>
            {UserDataContext?.userData && UserDataContext?.userData.name}'s wishlist
          </WishlistTitle>
          <SearchContainer>
            <SearchBar
              onChange={(event) => {
                handleInputChange(event.target.value);
              }}
              placeholder="Search by name"
            />
            <CustomSelect
              onChange={(selectedOption) =>
                handleSortChange(selectedOption, setSortBy)
              }
              value={sortBy}
            />
          </SearchContainer>
          <WishlistContainer>
            {isLoading ? (
              <LoaderBig marginTop="5rem" />
            ) : sortedApps.length > 0 ? (
              sortedApps.map((item) => (
                <WishlistItem key={item._id}>
                  <ItemImage src={item.titleImage} />
                  <Capsule>
                    <ItemTitle
                      onClick={() =>
                        history.push(APP_KEYS.ROUTER_KEYS.APPS + `/${item._id}`)
                      }
                    >
                      {item.title}
                    </ItemTitle>
                    <MidContainer>
                      <Stats>
                        <StatsLabel>Overall reviews:</StatsLabel>
                        <StatsLabel
                          style={{
                            color: calculateReviewTitle(item.reviews).color,
                          }}
                        >
                          {item.reviews &&
                            calculateReviewTitle(item.reviews).title}
                          {!item.reviews && "No reviews"}
                        </StatsLabel>
                        <StatsLabel>Release Date:</StatsLabel>
                        <StatsLabel>{formatDate(item.releaseDate)}</StatsLabel>
                      </Stats>
                      <ButtonWrapper className="wishlist-wrap">
                        {item.newPrice ? (
                          <PriceContainer className="New-Price">
                            <PricePercent>
                              -
                              {calculatePercentageDecrease(
                                Number(item.price),
                                Number(item.newPrice),
                                0
                              )}
                              %
                            </PricePercent>
                            <PriceAmounts className="wishlist-price-amounts">
                              <OriginalPrice>{item.price}$</OriginalPrice>
                              <FinalPrice className="wishlist-price-final-price">
                                {item.newPrice}$
                              </FinalPrice>
                            </PriceAmounts>
                          </PriceContainer>
                        ) : (
                          <AppPrice className="wishlist-price">
                            {item.price}
                            {item.price === "Free to Play" ? "" : "$"}
                          </AppPrice>
                        )}
                        <PurchaseButton
                          className="to-cart-button"
                          onClick={() => handleAddToLibrary(item._id)}
                        >
                          Add to Cart
                        </PurchaseButton>
                      </ButtonWrapper>
                    </MidContainer>
                    <TagsContainer>
                      <div>
                        {item.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                      <RemoveButton
                        onClick={() => handleDeleteFromWishlist(item._id)}
                      >
                        Remove
                      </RemoveButton>
                    </TagsContainer>
                  </Capsule>
                </WishlistItem>
              ))
            ) : (
              <NoItems>No apps in your wishlist.</NoItems>
            )}
          </WishlistContainer>
        </MainContainer>
        {showToast && (
          <Toast
            message="Successfully added to Library"
            onClose={() => setShowToast(false)}
          />
        )}
      </Background>
      <Footer />
    </>
  );
};
