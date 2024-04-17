import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import AbmLogoSvg from 'frontend/js/../images/shared/logo/abm-logo-white.svg';
import useStyles from './useStyles';

function Logo() {
  const classes = useStyles();
  const googleAnalyticsService = new GoogleAnalyticsService();

  const handleClick = () => {
    googleAnalyticsService.sendEvent('home', 'header_links', 'back_to_home');
  };

  return (
    <a href={RouterService.getRoute('home')} className={classes.root} onClick={handleClick}>
      <img src={AbmLogoSvg} className={classes.icon} alt="AutoBidMaster" />
    </a>
  );
}

export default Logo;
