import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { APP_KEYS } from "../../common/consts";
import { useUserData } from "../../common/context/user-context";
import { LoaderBig } from "../../common/loader/loader";
import { useDeleteFromLibrary, useGetUserById } from "../../common/services/user.service";
import { IApp } from "../../common/types/app.interface";
import { calculateReviewTitle } from "../../common/utils/calculateReviewRate";
import { formatDate } from "../../common/utils/formatDate";
import { Header } from "../header"
import { Footer } from "../home/footer"
import { handleSearch } from "../store/app-list/utils/handlers";
import { sortAppsByDiscount, sortAppsByLowestPrice, sortAppsByName, sortAppsByReleaseDate, sortAppsByReviews } from "../store/app-list/utils/sort-apps";
import { IUser } from "../../common/types/User";
import { Background, Capsule, ItemImage, ItemTitle, MainContainer, MidContainer, NicknameSpan, NoItems, SearchBar, SearchContainer, Stats, StatsLabel, Tag, TagsContainer, LibraryContainer, LibraryItem, LibraryTitle, RemoveButton } from "./index.styled"
import { CustomSelect } from "./select/custom-select";
import { useLibraryData } from "../../common/context/library-context";
import { handleNavigateToApp } from "../../common/utils/handleNavigate";
import { defaultAvatar } from "../../common/consts/avatar";
import { COLORS } from "../../common/theme";

export const Library = () => {
  const [sortedApps, setSortedApps] = useState<IApp[]>([]);
  const [user, setUser] = useState<IUser | null>(null)
  const [sortBy, setSortBy] = useState("Default");
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  const deleteFromLibraryMutation = useDeleteFromLibrary();
  const UserDataContext = useUserData();
  const libraryApps = useLibraryData();
  const history = useHistory();
  const getUserByIdMutation = useGetUserById()

  const fetchFriendsData = async () => {
    try {
      const user = await getUserByIdMutation.mutateAsync(id);
      setUser(user);
    } catch (error) {
      console.error("Error fetching friends' data:", error);
    }
  };

  useEffect(() => {
    if (UserDataContext?.userData?._id !== id) {
      fetchFriendsData();
    } else {
      setUser(UserDataContext.userData)
    }
  }, [id]);

  useEffect(() => {
    setSortedApps(libraryApps.libraryApps);
    setIsLoading(false);
  }, [libraryApps.libraryApps]);

  useEffect(() => {
    let sortedAppsCopy = [...libraryApps.libraryApps];

    switch (sortBy) {
      case "Default":
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
  }, [libraryApps.libraryApps, sortBy, searchInput]);

  const handleDeleteFromLibrary = (appId: string) => {
    if (UserDataContext?.userData) {
      const userId = UserDataContext?.userData._id;
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

  return (
    <>
      <Header />
      <Background>
        <MainContainer>
          <LibraryTitle>
            <img style={{border: `1px solid ${COLORS.tagBlue}`, width: '64px', marginRight: '16px'}} src={user?.avatar || defaultAvatar}/>
            {user && user.name}
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
                      onClick={() => handleNavigateToApp(item._id, history)}
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
                      {UserDataContext?.userData?._id === id && (
                        <RemoveButton
                          onClick={() => handleDeleteFromLibrary(item._id)}
                        >
                          Remove
                        </RemoveButton>
                      )}
                    </TagsContainer>
                  </Capsule>
                </LibraryItem>
              ))
            ) : UserDataContext?.userData?._id === id ? (
              <NoItems>No apps in your Library.</NoItems>
            ) : (
              <NoItems>{user?.name}'s Library is empty</NoItems>
            )}
          </LibraryContainer>
        </MainContainer>
      </Background>
      <Footer />
    </>
  );
};
