import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';
import AbmLogoSvg from 'frontend/images/shared/logo/abm-logo-white.svg';
import useStyles from './useStyles';

function Logo() {
  const classes = useStyles();

  return (
    <Link href={RouterService.getRoute('home')} className={classes.root}>
      <img src={AbmLogoSvg} className={classes.icon} alt="AutoBidMaster" />
    </Link>
  );
}

export default Logo;
