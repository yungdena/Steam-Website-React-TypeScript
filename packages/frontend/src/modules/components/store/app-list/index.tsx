import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAppsData } from '../../../common/context/apps-context';
import { ContentContainer, AppsList, AppContainer, AppImage, AppImageContainer, AppTitle, AppTextContainer, AppPrice, AppLink, AppReleaseDate, AppReviews, SearchBarContainer, SearchBarInput, SearchBarButton, SearchBarSortByTitle, SearchBarSortBySelect, SearchBarOption, Dropdown } from './index.styled';
import { PriceContainer, PriceAmounts, PricePercent, OriginalPrice, FinalPrice } from '../../home/offers/index.styled';
import { IApp } from '../../../common/types/app.interface';
import { calculatePercentageDecrease } from '../../../common/utils/countPercentage';
import { LoaderBig } from '../../../common/loader/loader';
import { formatDate } from '../../../common/utils/formatDate';
import { calculateReviewTitle, getReviewImageURL } from '../../../common/utils/calculateReviewRate';
import { sortAppsByHighestPrice, sortAppsByLowestPrice, sortAppsByName, sortAppsByReleaseDate, sortAppsByReviews } from './utils/sort-apps';
import { handleNavigate, handleSearch, handleSearchInputChange, handleSortChange } from './utils/handlers';
import { Button } from '../../auth/sign-up/index.styled';
import { BASE_URL } from '../../../common/services/base-url';

export const AppList = ({ sliceIndex, minHeight, margin }: { sliceIndex: number | null, minHeight?: string, margin?: string }) => {
  const [sortedApps, setSortedApps] = useState<IApp[]>([]);
  const [sortBy, setSortBy] = useState("Relevance");
  const [displayedApps, setDisplayedApps] = useState<IApp[]>([]);

  const history = useHistory();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchUrl = searchParams.get("search");
  const [searchInput, setSearchInput] = useState<string>(searchUrl || "");

  const { isLoadingApps, appsData, setPage, page, setPageError } = useAppsData();

useEffect(() => {
  const appsCopy = [...appsData];

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
}, [appsData, sortBy]);

  useEffect(() => {
    const displayedApps = sortedApps;

    setDisplayedApps(displayedApps);
  }, [page, sortedApps]);

  const handleNextPage = async () => {
    try {
      const nextPage = page + 1;

      const response = await fetch(`${BASE_URL}/apps/max-pages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get max pages");
      }

      const { maxPages } = await response.json();

      if (nextPage <= maxPages) {
        setPage(nextPage);
        setPageError(false);
      } else {
        setPageError(true);
      }
    } catch (error) {
      console.error("Error fetching next page:", error);
      setPageError(true);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <ContentContainer minHeight={minHeight}>
      {isLoadingApps ? (
        <LoaderBig marginTop="15rem" />
      ) : (
        <>
          <SearchBarContainer>
            <SearchBarInput
              onChange={(event) =>
                handleSearchInputChange(event, setSearchInput)
              }
              placeholder="enter search term or tag"
            />
            <SearchBarButton
              onClick={() => handleSearch(searchInput, setSortedApps, appsData)}
            >
              Search
            </SearchBarButton>
            <SearchBarSortByTitle>Sort by</SearchBarSortByTitle>
            <SearchBarSortBySelect
              onChange={(event) => handleSortChange(event, setSortBy)}
              value={sortBy}
            >
              <SearchBarOption>Relevance</SearchBarOption>
              <SearchBarOption>Release date</SearchBarOption>
              <SearchBarOption>Name</SearchBarOption>
              <SearchBarOption>Lowest Price</SearchBarOption>
              <SearchBarOption>Highest Price</SearchBarOption>
              <SearchBarOption>User Reviews</SearchBarOption>
            </SearchBarSortBySelect>
          </SearchBarContainer>
          <AppsList margin={margin}>
            {displayedApps
              .slice(0, sliceIndex ? sliceIndex : appsData.length)
              .map((app) => (
                <AppLink
                  key={app._id}
                  onClick={() => handleNavigate(app._id, history)}
                >
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
                          calculateReviewTitle(app.reviews).title
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
                            -
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
              <div style={{display: 'flex', gap: '8px', justifyContent: 'center'}}>
                <Button onClick={handlePreviousPage}>
                  Previous
                </Button>
                <Button onClick={handleNextPage}>Next</Button>
              </div>
          </AppsList>
        </>
      )}
    </ContentContainer>
  );
};
