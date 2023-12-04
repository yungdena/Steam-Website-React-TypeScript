import { APP_KEYS } from "../../../common/consts";
import { IUser } from "../../../common/types/User";
import { handleSearch } from "../../store/app-list/utils/handlers";
import { handleNavigate } from "../../../common/utils/handleNavigate";
import { IUserContext } from "../../../common/context/user-context";
import { IApp } from "../../../common/types/app.interface";

export const handleSortChange = (selectedOption: string, setSortBy: any) => {
  setSortBy(selectedOption);
};

export const handleDeleteFromWishlist = (
  appId: string,
  UserDataContext: IUserContext | null,
  deleteAppFromWishlistMutation: {
    mutateAsync: (data: any) => Promise<any>;
  },
  setSortedApps: any
) => {
  if (UserDataContext?.userData) {
    const userId = UserDataContext.userData._id;
    deleteAppFromWishlistMutation.mutateAsync({ userId, appId });

    setSortedApps((prevSortedApps: IApp[]) =>
      prevSortedApps.filter((app) => app._id !== appId)
    );

    if (UserDataContext?.userData) {
      const updatedUserData = { ...UserDataContext.userData } as IUser;
      updatedUserData.wishlist = updatedUserData.wishlist.filter(
        (id) => id !== appId
      );
      UserDataContext.setUser(updatedUserData, true);
    }
  }
};

export const handleAddToLibrary = async (
  appId: string,
  UserDataContext: IUserContext | null,
  addToLibraryMutation: any,
  deleteAppFromWishlistMutation: any,
  setShowToast: any,
  setSortedApps: any,
  history: any
) => {
  if (UserDataContext?.userData?._id) {
    const userId = UserDataContext?.userData?._id
    await addToLibraryMutation.mutateAsync({ userId, appId });
    setShowToast(true);

    const updatedUserData = { ...UserDataContext?.userData } as IUser | null;
    if (updatedUserData) {
      updatedUserData.apps.push(appId);
      UserDataContext?.setUser(updatedUserData, true);
      handleDeleteFromWishlist(
        appId,
        UserDataContext,
        deleteAppFromWishlistMutation,
        setSortedApps
      );
    }
  } else {
    handleNavigate(
      history,
      APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN
    );
  }
};

export const handleInputChange = (
  inputValue: string,
  setSearchInput: any,
  setSortedApps: any,
  sortedApps: IApp[]
) => {
  setSearchInput(inputValue);
  handleSearch(inputValue, setSortedApps, sortedApps);
};
