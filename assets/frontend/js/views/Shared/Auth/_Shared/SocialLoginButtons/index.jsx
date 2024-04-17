/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import FacebookLogin from 'frontend/js/views/Shared/Auth/_Shared/SocialLoginButtons/Facebook';
import GoogleLogin from 'frontend/js/views/Shared/Auth/_Shared/SocialLoginButtons/Google';
import OneLineText from 'frontend/js/components/OneLineText';
import useStyles from './useStyles';

function SocialLoginButtons({ isDisabled }) {
  const classes = useStyles();
  const intl = useIntl();
  const { isBelowMd } = useBreakpoint();

  const facebookLabel = isBelowMd ? (
    'Facebook'
  ) : (
    <OneLineText value={intl.formatMessage({ id: 'registerPage.socialLogin.continueWithFacebook' })} />
  );
  const googleLabel = isBelowMd ? (
    'Google'
  ) : (
    <OneLineText value={intl.formatMessage({ id: 'registerPage.socialLogin.continueWithGoogle' })} />
  );

  return (
    <div className={classes.root}>
      <FacebookLogin label={facebookLabel} isDisabled={isDisabled} />
      <GoogleLogin label={googleLabel} isDisabled={isDisabled} />
    </div>
  );
}

export default SocialLoginButtons;
