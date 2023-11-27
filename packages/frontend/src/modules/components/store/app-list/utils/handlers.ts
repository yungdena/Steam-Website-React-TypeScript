import { APP_KEYS } from "../../../../common/consts";
import { IApp } from "../../../../common/types/app.interface";

export const handleNavigate = (appId: string, history: any) => {
  history.push(
    `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.APPS}/${appId}`
  );
};
export const handleSortChange = (event: any, setSortBy: any) => {
  setSortBy(event.target.value);
};

export const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setSearchInput: any,
    setDebouncedSearchInput: any
  ) => {
    setSearchInput(event.target.value);
    setDebouncedSearchInput(event.target.value);
  };


export const handleSearch = (searchInput: string, setSortedApps: any, apps: IApp[]) => {
  console.log('search input', searchInput)
  if (searchInput.trim() === "") {
    setSortedApps(apps);
  } else {
    const filteredApps = apps.filter((app) => {
      return app.title.toLowerCase().includes(searchInput.toLowerCase());
    });
    setSortedApps(filteredApps);
  }
};