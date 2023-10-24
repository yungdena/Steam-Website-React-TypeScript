import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

export const MainRouter = () => (
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
        component={() => (
          <AppsDataProvider>
            <Wishlist />
          </AppsDataProvider>
        )}
        path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.WISHLIST}
      />
      <Route
        component={() => (
          <AppsDataProvider>
            <Library />
          </AppsDataProvider>
        )}
        path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.LIBRARY + "/:id"}
      />
      <Route
        component={FriendList}
        path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.FRIENDS + "/:id"}
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
        path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.PROFILE + "/:id"}
      />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
