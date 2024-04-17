import React from 'react';
import classnames from 'classnames';
import RouterService from 'frontend/js/api/RouterService';
import t from 'frontend/js/api/TranslatorService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import UserLocationService from 'frontend/js/api/UserLocationService';
import Button from 'frontend/js/components/Button';
import useStyles from './useStyles';

function RegisterButton() {
  const classes = useStyles();
  const { getRoute } = RouterService;
  const googleAnalyticsService = new GoogleAnalyticsService();
  const eventTrackingService = new EventTrackingService();
  const userLocationService = new UserLocationService();
  const href = userLocationService.isUserNigerian() ? getRoute('chekiNigeria') : getRoute('register');

  function handleClick() {
    eventTrackingService.sendEvent({ name: 'registration_button_click', step: 'abm_general' });
    googleAnalyticsService.sendEvent('register', 'header_links', 'register');
  }

  return (
    <Button
      label={t('header.register_now')}
      className={classnames(classes.registerButton, 'qa_register_button')}
      href={href}
      onClick={handleClick}
      color="yellow"
    />
  );
}

export default RegisterButton;
