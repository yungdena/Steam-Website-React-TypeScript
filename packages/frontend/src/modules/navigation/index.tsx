import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { SignUp } from '../auth/sign-up';
import { SignIn } from '../auth/sign-in';
import { APP_KEYS } from '../common/consts';
import { HomePage } from '../home';
import { AppPage } from '../app-page';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route component={SignUp} path={APP_KEYS.ROUTER_KEYS.ROOT} exact />
      <Route
        component={SignUp}
        path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNUP}
        exact
      />
      <Route component={SignIn} path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN} />
      <Route component={HomePage} path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.HOME} />
      <Route component={AppPage} path={APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.APPS + '/:id'} />
    </Switch>
  </Router>
);
