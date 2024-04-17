import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import SessionStorageService from 'frontend/js/lib/utils/SessionStorageService';
import RouterService from 'frontend/js/api/RouterService';
import RegisterView from 'frontend/js/views/Shared/Auth/RegisterView';
import Description from 'frontend/js/views/Shared/Auth/Description';

import useStyles from './useStyles';

const PREV_PAGE_HREF = 'ABM::prevPageHref';

function RegisterPage() {
  const classes = useStyles();
  const intl = useIntl();

  function handleSuccess() {
    LocalStorageService.set('previous_location', SessionStorageService.get(PREV_PAGE_HREF));
    if (window.fqb) {
      window.fqb('track', 'CompleteRegistration');
    }

    RouterService.customRedirect(RouterService.getFullRoute('registerCongrats'));
  }

  return (
    <div className={classes.root}>
      <ContainerFullScreen className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.description}>
            <div className={classes.descriptionTitle}>
              <FormattedMessage id="authComponents.descriptions.registerNowTitle" />
            </div>
            <Description top={36} className={classes.descriptionList} />
          </div>

          <div className={classes.form}>
            <RegisterView
              onSuccess={handleSuccess}
              title={intl.formatMessage({ id: 'authComponents.registerNowView.title' })}
            />
          </div>
        </div>
      </ContainerFullScreen>
    </div>
  );
}

export default RegisterPage;
