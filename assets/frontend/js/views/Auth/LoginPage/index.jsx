import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import RouterService from 'frontend/js/api/RouterService';
import SessionStorageService from 'frontend/js/lib/utils/SessionStorageService';

import LoginView from 'frontend/js/views/Shared/Auth/LoginView';

import AdbutlerAdvertisement from 'frontend/js/components/AdbutlerAdvertisement';
import useStyles from './useStyles';

const PREV_PAGE_HREF = 'ABM::prevPageHref';

function LoginPage() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <ContainerFullScreen className={classes.container}>
        <div className={classes.wrap}>
          <div className={classes.form}>
            <div className={classes.adBanner}>
              <AdbutlerAdvertisement id="585320" />
            </div>

            <LoginView
              onSuccess={() => {
                const redirectUrl =
                  SessionStorageService.get(PREV_PAGE_HREF) || RouterService.getFullRoute('dashboard');
                RouterService.customRedirect(redirectUrl);
              }}
              title={intl.formatMessage({ id: 'authComponents.signInView.title' })}
              className={classes.loginView}
            />
          </div>
        </div>
      </ContainerFullScreen>
    </div>
  );
}

export default LoginPage;
