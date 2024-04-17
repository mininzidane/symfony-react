import React from 'react';

import useIntl from 'frontend/js/hooks/useIntl';

import RegisterView from 'frontend/js/views/Shared/Auth/RegisterView';
import RouterService from 'frontend/js/api/RouterService';

const RegisterNow = () => {
  const intl = useIntl();

  return (
    <RegisterView
      onSuccess={() => {
        RouterService.customRedirect(RouterService.getFullRoute('registerCongrats'));
      }}
      title={intl.formatMessage({ id: 'authComponents.registerNowView.title' })}
    />
  );
};

export default RegisterNow;
