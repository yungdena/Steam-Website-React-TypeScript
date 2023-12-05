import { BrowserRouter as Router, Route, Switch, useHistory, useParams } from 'react-router-dom';

import { SignUp } from '../components/auth/sign-up';
import { SignIn } from '../components/auth/sign-in';
import { APP_KEYS } from '../common/consts';
import { StorePage } from '../components/store';
import { AppPage } from '../components/app-page';
import { AboutPage } from '../components/about';
import { HomePage } from '../components/home';
import { AdminPanel } from '../admin';
import { Wishlist } from '../components/wishlist';
import { Library } from '../components/library';
import { AppsDataProvider } from '../common/context/apps-context';
import { BannersDataProvider } from '../common/context/banners-context';
import { FriendList } from '../components/friend-list';
import { Profile } from '../components/profile';
import { NotFound } from '../components/NotFound';
import { Support } from '../components/support';
import { EditProfile } from '../components/profile/edit';
import { Community } from '../components/community';
import { PostsDataProvider } from '../common/context/community-context';
import { CreatePost } from '../components/community/create-post';
import { LibraryDataProvider } from '../common/context/library-context';
import { WishlistDataProvider } from '../common/context/wishlist-context';
import { useUserData } from '../common/context/user-context';

const LibraryRoute = () => {
  const { id }: { id: string } = useParams();

  return (
    <LibraryDataProvider userId={id}>
      <Library />
    </LibraryDataProvider>
  );
};

const WishlistRoute = () => {
  const UserDataProvider = useUserData();
  const history = useHistory()
  if (UserDataProvider?.userData?._id) {
    return (
      <WishlistDataProvider userId={UserDataProvider?.userData?._id}>
        <Wishlist />
      </WishlistDataProvider>
    );
  } else {
    history.push(APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN);
    return null;
  }
};
  
export const MainRouter = () => {
  const UserDataProvider = useUserData();
  return (
    <Router>
      <Switch>
        <Route component={SignUp} path={APP_KEYS.ROUTER_KEYS.ROOT} exact />
        <Route
          component={AdminPanel}
          path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.ADMIN}
        />
        <Route
          component={SignUp}
          path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNUP}
          exact
        />
        <Route
          component={SignIn}
          path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN}
        />
        <Route
          component={() => (
            <AppsDataProvider>
              <StorePage />
            </AppsDataProvider>
          )}
          path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.STORE}
        />
        <Route
          component={AppPage}
          path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.APPS + "/:id"}
        />
        <Route
          component={() => (
            <AppsDataProvider>
              <BannersDataProvider>
                <HomePage />
              </BannersDataProvider>
            </AppsDataProvider>
          )}
          path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.HOME}
        />
        <Route
          component={AboutPage}
          path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.ABOUT}
        />
        <Route
          path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.WISHLIST}
        >
          <WishlistRoute />
        </Route>
        <Route
          path={
            APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.LIBRARY + "/:id"
          }
        >
          <LibraryRoute />
        </Route>
        <Route
          component={FriendList}
          path={
            APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.FRIENDS + "/:id"
          }
        />
        <Route
          component={Support}
          path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SUPPORT}
        />
        <Route
          component={() => (
            <AppsDataProvider>
              <Profile />
            </AppsDataProvider>
          )}
          path={
            APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.PROFILE + "/:id"
          }
        />
        <Route
          component={EditProfile}
          path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.EDIT + "/:id"}
        />
        <Route
          exact
          component={() => (
            <AppsDataProvider>
              <PostsDataProvider>
                <Community />
              </PostsDataProvider>
            </AppsDataProvider>
          )}
          path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.COMMUNITY}
        />
        <Route
          exact
          component={() => (
            <AppsDataProvider>
              <PostsDataProvider>
                <CreatePost />
              </PostsDataProvider>
            </AppsDataProvider>
          )}
          path={
            APP_KEYS.ROUTER_KEYS.ROOT +
            APP_KEYS.ROUTER_KEYS.COMMUNITY +
            "/" +
            APP_KEYS.ROUTER_KEYS.CREATE
          }
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

