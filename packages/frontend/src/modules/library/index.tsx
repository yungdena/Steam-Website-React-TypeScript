import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { APP_KEYS } from "../common/consts";
import { useUserData } from "../common/context/user-context";
import { LoaderBig } from "../common/loader/loader";
import { useGetAppById } from "../common/services/apps.service";
import { useDeleteFromLibrary } from "../common/services/user.service";
import { IApp } from "../common/types/app.interface";
import { calculateReviewTitle } from "../common/utils/calculateReviewRate";
import { formatDate } from "../common/utils/formatDate";
import { Header } from "../header"
import { Footer } from "../home/footer"
import { handleSearch } from "../store/app-list/utils/handlers";
import { sortAppsByDiscount, sortAppsByLowestPrice, sortAppsByName, sortAppsByReleaseDate, sortAppsByReviews } from "../store/app-list/utils/sort-apps";
import { Background, Capsule, ItemImage, ItemTitle, MainContainer, MidContainer, NicknameSpan, NoItems, SearchBar, SearchContainer, Stats, StatsLabel, Tag, TagsContainer, LibraryContainer, LibraryItem, LibraryTitle, RemoveButton } from "./index.styled"
import { CustomSelect } from "./select/custom-select";

export const Library = () => {
  const [apps, setApps] = useState<IApp[]>([]);
  const [sortedApps, setSortedApps] = useState<IApp[]>([]);
  const [sortBy, setSortBy] = useState<string>("Your Rank");
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const UserDataContext = useUserData();
  console.log("userData in library", UserDataContext?.userData);
  const history = useHistory()
  const deleteFromLibraryMutation = useDeleteFromLibrary();
  const getAppByIdMutation = useGetAppById();

  useEffect(() => {
    async function getAppsFromLibrary() {
      if (UserDataContext?.userData?.apps) {
        try {
          const appsResponse = await Promise.all(
            UserDataContext.userData.apps.map((id: string) =>
              getAppByIdMutation.mutateAsync(id)
            )
          );
          setApps(appsResponse);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching apps from library:", error);
        }
      } else {
        setIsLoading(false);
        setApps([]);
      }
    }

    getAppsFromLibrary();
  }, [UserDataContext]);

  useEffect(() => {
    const appsCopy = [...apps];

    switch (sortBy) {
      case "Your Rank":
        break;
      case "Release Date":
        sortAppsByReleaseDate(appsCopy);
        break;
      case "Name":
        sortAppsByName(appsCopy);
        break;
      case "Price":
        sortAppsByLowestPrice(appsCopy);
        break;
      case "Review Score":
        sortAppsByReviews(appsCopy);
        break;
      case "Discount":
        sortAppsByDiscount(appsCopy);
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

  const handleDeleteFromLibrary = (appId: string) => {
    if (UserDataContext?.userData) {
      const userId = UserDataContext?.userData._id;
      deleteFromLibraryMutation.mutateAsync({ userId, appId });
      setApps(sortedApps.filter((app) => app._id !== appId));
    }
  };
  
  const handleSortChange = (selectedOption: string, setSortBy: any) => {
    setSortBy(selectedOption);
  };
  
  const handleInputChange = (inputValue: string) => {
    setSearchInput(inputValue);
    handleSearch(inputValue, setSortedApps, apps);
  };

  console.log('apps', apps)

  return (
    <>
      <Header />
      <Background>
        <MainContainer>
          <LibraryTitle>
            {UserDataContext?.userData && UserDataContext?.userData.name}
            <NicknameSpan>
              {">"}
              {">"} games
            </NicknameSpan>
          </LibraryTitle>
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
          <LibraryContainer>
            {isLoading ? (
              <LoaderBig marginTop="5rem" />
            ) : sortedApps.length > 0 ? (
              sortedApps.map((item) => (
                <LibraryItem key={item._id}>
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
                    </MidContainer>
                    <TagsContainer>
                      <div>
                        {item.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                      <RemoveButton
                        onClick={() => handleDeleteFromLibrary(item._id)}
                      >
                        Remove
                      </RemoveButton>
                    </TagsContainer>
                  </Capsule>
                </LibraryItem>
              ))
            ) : (
              <NoItems>No apps in your Library.</NoItems>
            )}
          </LibraryContainer>
        </MainContainer>
      </Background>
      <Footer />
    </>
  );
};
