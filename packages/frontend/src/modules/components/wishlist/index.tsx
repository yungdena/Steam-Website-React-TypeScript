import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ButtonWrapper, PurchaseButton } from "../app-page/index.styled";
import { APP_KEYS } from "../../common/consts";
import { useAppsData } from "../../common/context/apps-context";
import { useUserData } from "../../common/context/user-context";
import { LoaderBig } from "../../common/loader/loader";
import { useAddToLibrary, useDeleteFromWishlist } from "../../common/services/user.service";
import { IApp } from "../../common/types/app.interface";
import { calculateReviewTitle } from "../../common/utils/calculateReviewRate";
import { calculatePercentageDecrease } from "../../common/utils/countPercentage";
import { formatDate } from "../../common/utils/formatDate";
import { Header } from "../header"
import { Footer } from "../home/footer"
import { FinalPrice, OriginalPrice, PriceAmounts, PriceContainer, PricePercent } from "../home/offers/index.styled";
import { AppPrice } from "../store/app-list/index.styled";
import { sortAppsByDiscount, sortAppsByLowestPrice, sortAppsByName, sortAppsByReleaseDate, sortAppsByReviews } from "../store/app-list/utils/sort-apps";
import { Background, Capsule, ItemImage, ItemTitle, MainContainer, MidContainer, NoItems, RemoveButton, SearchBar, SearchContainer,  Stats, StatsLabel, Tag, TagsContainer, WishlistContainer, WishlistItem, WishlistTitle } from "./index.styled"
import { CustomSelect } from "./select/custom-select";
import Toast from "./toast";
import { handleAddToLibrary, handleDeleteFromWishlist, handleInputChange, handleSortChange } from "./utils/functions";

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
                handleInputChange(event.target.value, setSearchInput, setSortedApps, sortedApps);
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
                          onClick={() => handleAddToLibrary(item._id, UserDataContext, addToLibraryMutation, deleteAppFromWishlistMutation, setShowToast, setSortedApps, history)}
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
                        onClick={() => handleDeleteFromWishlist(item._id, UserDataContext, deleteAppFromWishlistMutation, setSortedApps)}
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
