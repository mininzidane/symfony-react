import React, { useMemo } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';

import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import TranslationProvider from 'frontend/js/providers/TranslationProvider';
import SnackbarProvider from 'frontend/js/providers/SnackbarProvider';
import AuthModalProvider from 'frontend/js/providers/AuthModalProvider';
import { NotificationsProvider } from 'frontend/js/providers/NotificationsProvider';

import ErrorBoundary from 'frontend/js/router/ErrorBoundary';

import useCookiesConsent from 'frontend/js/hooks/useCookiesConsent';
import useLoadGTM from 'frontend/js/hooks/useLoadGTM';

import 'frontend/js/analytics';
import 'frontend/js/polyfills';

import LocationChangeHandler from './LocationChangeHandler';
import Page from './Page';
import ROUTES from './routes';
import browserHistory from './browser-history';
import './links-handlers';

const createRoute = ({ key, path, exact, ...params }) => (
  <Route key={key || path} path={path} exact={exact} render={() => <Page {...params} />} />
);

const SpaRouter = () => {
  useCookiesConsent();
  useLoadGTM();

  return useMemo(
    () => (
      <ReactQueryProvider>
        <ThemeProvider>
          <TranslationProvider>
            <SnackbarProvider>
              <AuthModalProvider>
                <NotificationsProvider>
                  <Router history={browserHistory}>
                    <LocationChangeHandler />
                    <ErrorBoundary>
                      <div id="page-container" className="page-container">
                        <Switch>{ROUTES.map(createRoute)}</Switch>
                        <div id="r-modal" />
                      </div>
                    </ErrorBoundary>
                  </Router>
                </NotificationsProvider>
              </AuthModalProvider>
            </SnackbarProvider>
          </TranslationProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    ),
    [],
  );
};

const element = document.getElementById('spa-react-root');

if (element) {
  window.isSPAEnv = true;
  ReactDOM.render(<SpaRouter />, element);
}
