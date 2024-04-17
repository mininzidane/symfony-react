import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RegisterCard from 'frontend/js/views/Shared/Auth/RegisterCard';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function RegistrationForm() {
  const classes = useStyles();

  function handleSuccess() {
    RouterService.customRedirect(RouterService.getFullRoute('registerCongrats'));
  }

  return (
    <RegisterCard
      onSuccess={handleSuccess}
      className={classes.root}
      footer={
        <div className={classes.footer}>
          <FormattedMessage
            id="shared.access.alreadyHaveAnAccount"
            values={{ a: (chunks) => <Link routeParams={['login']}>{chunks}</Link> }}
          />
        </div>
      }
    />
  );
}

export default RegistrationForm;
