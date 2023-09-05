import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ContentContainer, AppsList, AppContainer, AppImage, AppImageContainer, AppTitle, AppTextContainer, AppPrice, AppLink, AppReleaseDate, AppReviews, SearchBarContainer, SearchBarInput, SearchBarButton, SearchBarSortByTitle, SearchBarSortBySelect, SearchBarOption, Dropdown } from './index.styled';
import { PriceContainer, PriceAmounts, PricePercent, OriginalPrice, FinalPrice } from '../../home/offers/index.styled';
import { useGetAllApps } from '../../common/services/apps.service';
import { IApp } from '../../common/types/app.interface';
import { APP_KEYS } from '../../common/consts';
import { calculatePercentageDecrease } from '../../common/utils/countPercentage';
import { LoaderBig } from '../../common/loader/loader';
import { formatDate } from '../../common/utils/formatDate';
import { calculateReviewTitle, getReviewImageURL } from '../../common/utils/calculateReviewRate';
import { sortAppsByHighestPrice, sortAppsByLowestPrice, sortAppsByName, sortAppsByReleaseDate, sortAppsByReviews } from './utils/sort-apps';
import { handleNavigate, handleSearch, handleSearchInputChange, handleSortChange } from './utils/handlers';

export const AppList = ({ sliceIndex, minHeight, margin }: { sliceIndex: number | null, minHeight?: string, margin?: string }) => {
  const [apps, setApps] = useState<IApp[]>([]);
  const [sortedApps, setSortedApps] = useState<IApp[]>([]);
  const [sortBy, setSortBy] = useState("Relevance");
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const getAllAppsMutation = useGetAllApps();

  useEffect(() => {
    async function fetchAllApps() {
      const data = await getAllAppsMutation.mutateAsync();
      console.log("response on front: ", data);
      setApps(data);
      setIsLoading(false);
    }
    fetchAllApps();
  }, []);

useEffect(() => {
  const appsCopy = [...apps];

  switch (sortBy) {
    case "Relevance":
      break;
    case "Release date":
      sortAppsByReleaseDate(appsCopy);
      break;
    case "Name":
      sortAppsByName(appsCopy);
      break;
    case "Lowest Price":
      sortAppsByLowestPrice(appsCopy);
      break;
    case "Highest Price":
      sortAppsByHighestPrice(appsCopy);
      break;
    case "User Reviews":
      sortAppsByReviews(appsCopy);
      break;
    default:
      break;
  }

  if (searchInput) {
    const filteredApps = appsCopy.filter((app) =>
      app.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSortedApps(filteredApps);
  } else {
    setSortedApps(appsCopy);
  }
}, [apps, sortBy]);

  return (
    <ContentContainer minHeight={minHeight}>
      {isLoading ? (
        <LoaderBig marginTop="15rem" />
      ) : (
        <>
          <SearchBarContainer>
            <SearchBarInput
              onChange={(event) => handleSearchInputChange(event, setSearchInput)}
              placeholder="enter search term or tag"
            />
            <SearchBarButton onClick={() => handleSearch(searchInput, setSortedApps, apps)}>Search</SearchBarButton>
            <SearchBarSortByTitle>Sort by</SearchBarSortByTitle>
            <SearchBarSortBySelect onChange={(event) => handleSortChange(event, setSortBy)} value={sortBy}>
              <SearchBarOption>Relevance</SearchBarOption>
              <SearchBarOption>Release date</SearchBarOption>
              <SearchBarOption>Name</SearchBarOption>
              <SearchBarOption>Lowest Price</SearchBarOption>
              <SearchBarOption>Highest Price</SearchBarOption>
              <SearchBarOption>User Reviews</SearchBarOption>
            </SearchBarSortBySelect>
          </SearchBarContainer>
          <AppsList margin={margin}>
            {sortedApps
              .slice(0, sliceIndex ? sliceIndex : apps.length)
              .map((app) => (
                <AppLink key={app._id} onClick={() => handleNavigate(app._id, history)}>
                  <AppContainer>
                    <AppImageContainer>
                      <AppImage src={app.bannerImage} />
                    </AppImageContainer>
                    <AppTextContainer>
                      <AppTitle>{app.title}</AppTitle>
                      <AppReleaseDate>
                        {formatDate(app.releaseDate)}
                      </AppReleaseDate>
                      <AppReviews
                        src={getReviewImageURL(
                          calculateReviewTitle(app.reviews)
                        )}
                      />
                      {!app.newPrice && (
                        <AppPrice>
                          {app.price}
                          {app.price === "Free to Play" ? "" : "$"}
                        </AppPrice>
                      )}
                      {app.newPrice && (
                        <PriceContainer className="New-Price">
                          <PricePercent>
                            {calculatePercentageDecrease(
                              Number(app.price),
                              Number(app.newPrice),
                              0
                            )}
                            %
                          </PricePercent>
                          <PriceAmounts>
                            <OriginalPrice>{app.price}$</OriginalPrice>
                            <FinalPrice>{app.newPrice}$</FinalPrice>
                          </PriceAmounts>
                        </PriceContainer>
                      )}
                    </AppTextContainer>
                  </AppContainer>
                </AppLink>
              ))}
          </AppsList>
        </>
      )}
    </ContentContainer>
  );
};
