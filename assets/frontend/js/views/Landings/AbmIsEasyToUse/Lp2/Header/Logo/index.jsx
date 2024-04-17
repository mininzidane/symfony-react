import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import AbmLogoSvg from 'frontend/images/shared/logo/abm-logo-blue.svg';
import useStyles from './useStyles';

function Logo() {
  const classes = useStyles();

  return (
    <a href={RouterService.getRoute('home')} className={classes.root}>
      <img src={AbmLogoSvg} className={classes.icon} alt="AutoBidMaster" />
    </a>
  );
}

export default Logo;
