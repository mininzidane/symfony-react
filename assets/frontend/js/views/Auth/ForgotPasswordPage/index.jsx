import React from 'react';
import ForgotPasswordView from 'frontend/js/views/Shared/Auth/ForgotPasswordView';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import RouterService from 'frontend/js/api/RouterService';

import useStyles from './useStyles';

function ForgotPasswordPage() {
  const classes = useStyles();

  return (
    <ContainerFullScreen background={{ color: '#F1F1F8' }} className={classes.wrapper}>
      <div className={classes.root}>
        <ForgotPasswordView
          onSignInClick={() => {
            RouterService.redirect('login');
          }}
        />
      </div>
    </ContainerFullScreen>
  );
}

export default ForgotPasswordPage;
