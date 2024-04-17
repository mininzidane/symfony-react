import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import Container from 'frontend/js/components/Container';
import Link from 'frontend/js/components/Link';
import AbmLogoSvg from 'frontend/images/shared/logo/abm-logo-white.svg';
import CopartLogoSvg from 'frontend/images/shared/partners/copart-broker-white.svg';
import useStyles from './useStyles';

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.grid}>
          <Link href={RouterService.getRoute('home')} className={classes.abmLogoLink}>
            <img src={AbmLogoSvg} className={classes.abmLogoImage} alt="AutoBidMaster" />
          </Link>

          <h1 className={classes.title}>BID ON ALL VEHICLES FROM COPART AUTO AUCTION</h1>

          <Link routeParams={['copart', null, true]} isTargetBlank>
            <img src={CopartLogoSvg} alt="Copart" className={classes.copartLogo} />
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Header;
