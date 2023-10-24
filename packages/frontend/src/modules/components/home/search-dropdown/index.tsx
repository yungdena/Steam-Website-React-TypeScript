import { IApp } from "../../../common/types/app.interface";
import { App, AppImage, AppPrice, AppTextContainer, AppTitle, MainContainer, SearchList } from "./index.styled";
import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../../../common/consts";

interface IComponent {
  apps: IApp[] | null;
  searchQuery: string;
}

const SearchApps = ({ apps, searchQuery }: IComponent) => {
  const history = useHistory();

  const filteredApps = apps?.filter((app) =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (searchQuery !== "" && (
    <MainContainer>
      <SearchList>
        {filteredApps?.slice(0, 5).map((app) => (
          <App
            onClick={() =>
              history.push(APP_KEYS.ROUTER_KEYS.APPS + `/${app._id}`)
            }
            key={app._id}
          >
            <AppImage src={app.bannerImage} />
            <AppTextContainer>
              <AppTitle>{app.title}</AppTitle>
              <AppPrice>{app.price !== 'Free to Play' && `${app.newPrice || app.price}$` || app.price}</AppPrice>
            </AppTextContainer>
          </App>
        ))}
      </SearchList>
    </MainContainer>
  )) as JSX.Element | null;
};

export default SearchApps;
