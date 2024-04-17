import React from 'react';
import classnames from 'classnames';
import RouterService from 'frontend/js/api/RouterService';
import t from 'frontend/js/api/TranslatorService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import UserMobileSvg from './img/user-mobile-24x24.svg';
import useStyles from './useStyles';

function SignInButton() {
  const classes = useStyles();
  const googleAnalyticsService = new GoogleAnalyticsService();
  const eventTrackingService = new EventTrackingService();

  function handleClick() {
    eventTrackingService.sendEvent({ name: 'sign_in_link_click', step: 'abm_general' });
    googleAnalyticsService.sendEvent('login', 'header_links', 'login');
  }

  return (
    <a
      className={classnames(classes.signInButton, 'qa_sign_in_button')}
      href={RouterService.getRoute('login')}
      onClick={handleClick}
    >
      <img className={classes.signInButtonIcon} src={UserMobileSvg} alt={t('header.sign_in')} />
      {t('header.sign_in')}
    </a>
  );
}

export default SignInButton;
