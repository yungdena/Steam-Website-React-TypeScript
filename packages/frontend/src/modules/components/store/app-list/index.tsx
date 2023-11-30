import { useEffect, useRef, useState } from 'react';
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
import { useGetAppsByPrice, useGetAppsByTags, useGetAppsByTitle, useGetDiscounts, useGetMaxPages } from '../../../common/services/apps.service';
import { handleNavigateToApp } from '../../../common/utils/handleNavigate';

export const AppList = ({ sliceIndex, minHeight, margin }: { sliceIndex: number | null, minHeight?: string, margin?: string }) => {
  const [sortedApps, setSortedApps] = useState<IApp[]>([]);
  const [sortBy, setSortBy] = useState("Relevance");
  const [displayedApps, setDisplayedApps] = useState<IApp[]>([]);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const history = useHistory();

  const location = useLocation();
  const getAppsByTagsMutation = useGetAppsByTags();
  const getAppsByTitleMutation = useGetAppsByTitle();
  const getDiscounts = useGetDiscounts();
  const getAppsByPrice = useGetAppsByPrice();
  const getMaxPages = useGetMaxPages()
  const searchParams = new URLSearchParams(location.search);
  const searchUrl = searchParams.get("search");
  const tagsParam = searchParams.get("tags");
  const onlySpecialOffersParam = searchParams.get("onlySpecialOffers");
  const hideFreeParam = searchParams.get("hideFree");
  const priceParam = searchParams.get("price");
  const [searchInput, setSearchInput] = useState<string>(searchUrl || "");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState<string>(
    searchUrl || ""
  );
  const isMountedRef = useRef(true);

  const { isLoadingApps, appsData, page, setPage, isLoadingNewApps } = useAppsData();

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

    let filteredApps = appsCopy;

    const fetchDiscounts = async () => {
      try {
        if (
          onlySpecialOffersParam !== null &&
          onlySpecialOffersParam === "true"
        ) {
          const fetchedApps = await getDiscounts.mutateAsync()
          if (isMountedRef.current) {
            setSortedApps(fetchedApps);
          }
        } else {
          if (isMountedRef.current) {
            setSortedApps(filteredApps);
          }
        }
      } catch (error) {
        console.error("Error fetching apps by tags:", error);
        if (isMountedRef.current) {
          setSortedApps(filteredApps);
        }
      }
    };

    const fetchByPrice = async () => {
      try {
        let fetchedApps;

        if (priceParam !== null) {
          if (priceParam === "Free to Play") {
            fetchedApps = await getAppsByPrice.mutateAsync("Free%20to%20Play");
          } else if (priceParam === "Any Price") {
            fetchedApps = filteredApps;
          } else {
            fetchedApps = await getAppsByPrice.mutateAsync(priceParam);
          }
        }

        if (isMountedRef.current) {
          setSortedApps(fetchedApps);
        }
      } catch (error) {
        console.error("Error fetching apps by price:", error);
        if (isMountedRef.current) {
          setSortedApps(filteredApps);
        }
      }
    };

    if (hideFreeParam !== null && Boolean(hideFreeParam) === true) {
      const hideFree = hideFreeParam === "true";
      filteredApps = filteredApps.filter(
        (app) => !(hideFree && app.price === "Free to Play")
      );
    }

    if (searchInput) {
      filteredApps = filteredApps.filter((app) =>
        app.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    const fetchAppsByTags = async () => {
      try {
        if (tagsParam) {
          const tagsArray = tagsParam.split(",").map((tag) => tag.trim());
          const fetchedApps = await getAppsByTagsMutation.mutateAsync(
            tagsArray
          );
          if (isMountedRef.current) {
            setSortedApps(fetchedApps);
          }
        } else {
          if (isMountedRef.current) {
            setSortedApps(filteredApps);
          }
        }
      } catch (error) {
        console.error("Error fetching apps by tags:", error);
        if (isMountedRef.current) {
          setSortedApps(filteredApps);
        }
      }
    };
    fetchByPrice();
    fetchDiscounts();
    fetchAppsByTags();
  }, [
    appsData,
    sortBy,
    tagsParam,
    hideFreeParam,
    priceParam,
    onlySpecialOffersParam,
  ]);

  useEffect(() => {
    const displayedApps = sortedApps;

    setDisplayedApps(displayedApps);
  }, [page, sortedApps]);

  useEffect(() => {
    const displayedApps = sortedApps.slice(
      0,
      sliceIndex ? sliceIndex : appsData.length
    );
    setDisplayedApps(displayedApps);
  }, [page, sortedApps]);

  useEffect(() => {
    const handleScroll = async () => {
      const scrolledToBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight;

      if (scrolledToBottom && !isLoadingNewApps) {
        try {
          const maxPages = await getMaxPages.mutateAsync();
          if (page < maxPages.maxPages) {
            setLoadingNextPage(true);
            setPage(page + 1);
          }
        } catch (error) {
          console.error("Error fetching max pages:", error);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const debouncedPerformSearch = async () => {
    if (debouncedSearchInput.trim() === "") {
      setSortedApps(appsData);
      searchParams.delete("search");
      history.push({ search: searchParams.toString() });
      return;
    }

    try {
      const response = await getAppsByTitleMutation.mutateAsync(
        debouncedSearchInput
      );
      if (response.message) {
        setSortedApps([]);
      } else {
        setSortedApps(response);
      }
    } catch (error) {
      console.error("Error searching apps:", error);
    }
  };

  return (
    <ContentContainer minHeight={minHeight}>
      {isLoadingApps ? (
        <LoaderBig marginTop="10rem" marginRight="40rem" />
      ) : (
        <>
          <SearchBarContainer>
            <SearchBarInput
              onChange={(event) =>
                handleSearchInputChange(event, setSearchInput, setDebouncedSearchInput)
              }
              value={debouncedSearchInput}
              placeholder="enter search term or tag"
            />
            <SearchBarButton
              onClick={() => debouncedPerformSearch()}
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
                  onClick={() => handleNavigateToApp(app._id, history)}
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
          </AppsList>
          {isLoadingNewApps && <LoaderBig marginTop="2rem" />}
        </>
      )}
    </ContentContainer>
  );
};
