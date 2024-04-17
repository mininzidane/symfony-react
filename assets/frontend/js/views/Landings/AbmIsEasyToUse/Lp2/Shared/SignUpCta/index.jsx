import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import Button from 'frontend/js/components/Button';
import useStyles from './useStyles';

function SignUpCta() {
  const eventTrackingService = new EventTrackingService();
  const classes = useStyles();

  function handleClick() {
    ScrollService.scrollToTop(true);
    eventTrackingService.sendEvent({ name: 'sign_up_now_bottom_button_click', step: 'abm_landing' });

    setTimeout(() => {
      document.getElementById('register-first-name').focus();
    }, 1000);
  }

  return (
    <Button
      label={<FormattedMessage id="stateLandingPage.promo.sign_up_now" />}
      isInline
      color="yellow"
      size="lg"
      className={classes.root}
      onClick={handleClick}
    />
  );
}

export default SignUpCta;
