import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { APP_KEYS } from "../common/consts";
import { useAppsData } from "../common/context/apps-context";
import { useUserData } from "../common/context/user-context";
import { LoaderBig } from "../common/loader/loader";
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
  const [sortedApps, setSortedApps] = useState<IApp[]>([]);
  const [sortBy, setSortBy] = useState("Your Rank");
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const deleteFromLibraryMutation = useDeleteFromLibrary();
  const UserDataContext = useUserData();
  const { appsData } = useAppsData();
  const history = useHistory();

  const userLibraryIds = UserDataContext?.userData?.apps || [];
  const userLibraryApps = appsData.filter((app) =>
    userLibraryIds.includes(app._id)
  );

  useEffect(() => {
    setSortedApps(userLibraryApps);
    setIsLoading(false);
  }, [appsData, userLibraryIds]);

  useEffect(() => {
    let sortedAppsCopy = [...userLibraryApps];

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
  }, [appsData, userLibraryIds, sortBy, searchInput]);

  const handleDeleteFromLibrary = (appId: string) => {
    if (UserDataContext?.userData) {
      const userId = UserDataContext?.userData._id;
      console.log(`deleting ${appId} from user ${userId}`)
      deleteFromLibraryMutation.mutateAsync({ userId, appId });
      setSortedApps(sortedApps.filter((app) => app._id !== appId));
    }
  };
  
  const handleSortChange = (selectedOption: string, setSortBy: any) => {
    setSortBy(selectedOption);
  };
  
  const handleInputChange = (inputValue: string) => {
    setSearchInput(inputValue);
    handleSearch(inputValue, setSortedApps, sortedApps);
  };

  console.log('userData in library', UserDataContext?.userData)

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
