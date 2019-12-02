import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
  IntlProvider,
  NotificationProvider,
  ThemeProvider,
  AuthRouter,
  AuthRoute,
  SignUp
} from 'amplify-material-ui';
import MUILink from '@material-ui/core/Link';

import { Header } from './components/header';

import { Share } from './pages/share';
import { Secret } from './pages/secret';
import { Private } from './pages/private';
import { History } from './pages/history';

const Brand = (
  <MUILink
    to="/"
    color="inherit"
    component={Link}
    underline="none"
    variant="h6"
  >
    One-Time-Secret
  </MUILink>
);

export const App: React.FC = () => {
  return (
    <IntlProvider>
      <NotificationProvider>
        <ThemeProvider>
          <Router>
            <Switch>
              <Route path="/secret/:linkId">
                <Header title={Brand} />
                <Secret />
              </Route>
              <Route path="/">
                <AuthRouter title={Brand} hide={[SignUp]} hideSignUpLink>
                  <AuthRoute validAuthStates={['signedIn']}>
                    {() => (
                      <Switch>
                        <Route exact path="/">
                          <History />
                        </Route>
                        <Route path="/share">
                          <Share />
                        </Route>
                        <Route path="/private/:secretId">
                          <Private />
                        </Route>
                      </Switch>
                    )}
                  </AuthRoute>
                </AuthRouter>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </NotificationProvider>
    </IntlProvider>
  );
};
