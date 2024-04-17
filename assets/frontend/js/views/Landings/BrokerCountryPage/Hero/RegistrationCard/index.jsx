import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import RegisterCard from 'frontend/js/views/Shared/Auth/RegisterCard';
import useStyles from './useStyles';

function RegistrationCard() {
  const classes = useStyles();

  function handleSuccess() {
    RouterService.customRedirect(RouterService.getFullRoute('registerCongrats'));
  }

  return (
    <div id="register-card-container">
      <RegisterCard
        onSuccess={handleSuccess}
        className={classes.root}
        title={<FormattedMessage id="registerPage.title" />}
      />
    </div>
  );
}

export default RegistrationCard;
