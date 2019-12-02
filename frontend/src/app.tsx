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

import { SharePage } from './pages/share-page';
import { RetrievePage } from './pages/retrieve-page';
import { SecretPage } from './pages/secret-page';
import { SummaryPage } from './pages/summary-page';

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
              <Route path="/secrets/:linkId/retrieve">
                <Header title={Brand} />
                <RetrievePage />
              </Route>
              <Route path="/">
                <AuthRouter title={Brand} hide={[SignUp]} hideSignUpLink>
                  <AuthRoute validAuthStates={['signedIn']}>
                    {() => (
                      <Switch>
                        <Route exact path="/">
                          <SummaryPage />
                        </Route>
                        <Route path="/secrets/share">
                          <SharePage />
                        </Route>
                        <Route path="/secrets/:secretId">
                          <SecretPage />
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
