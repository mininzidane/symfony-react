import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Link from 'frontend/js/components/Link';
import Card from 'frontend/js/components/Card';
import RouterService from 'frontend/js/api/RouterService';
import RegisterCard from 'frontend/js/views/Shared/Auth/RegisterCard';
import useStyles from './useStyles';

function RegistrationCard() {
  const CHANNEL_COPART_LATAM_PAGE = 3;
  const classes = useStyles();

  function handleSuccess() {
    RouterService.customRedirect(RouterService.getFullRoute('registerCongrats'));
  }

  return (
    <div id="register-card-container">
      <Card elevation={2} className={classes.wrap}>
        <RegisterCard
          channel={CHANNEL_COPART_LATAM_PAGE}
          onSuccess={handleSuccess}
          className={classes.root}
          title="¡Registra una Nueva Cuenta GRATIS!"
          autoFocus
          classes={{
            title: classes.title,
          }}
          footer={
            <div className={classes.login}>
              <FormattedMessage
                id="shared.access.alreadyHaveAnAccount"
                values={{ a: (chunks) => <Link routeParams={['login']}>{chunks}</Link> }}
              />
            </div>
          }
        />
      </Card>
    </div>
  );
}

export default RegistrationCard;
