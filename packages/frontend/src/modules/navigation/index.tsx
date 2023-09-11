import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { SignUp } from '../auth/sign-up';
import { SignIn } from '../auth/sign-in';
import { APP_KEYS } from '../common/consts';
import { StorePage } from '../store';
import { AppPage } from '../app-page';
import { AboutPage } from '../about';
import { HomePage } from '../home';
import { AdminPanel } from '../admin';
import { Wishlist } from '../wishlist';
import { Library } from '../library';

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
        component={StorePage}
        path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.STORE}
      />
      <Route
        component={AppPage}
        path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.APPS + "/:id"}
      />
      <Route
        component={HomePage}
        path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.HOME}
      />
      <Route
        component={AboutPage}
        path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.ABOUT}
      />
      <Route
        component={Wishlist}
        path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.WISHLIST}
      />
      <Route
        component={Library}
        path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.LIBRARY}
      />
    </Switch>
  </Router>
);
