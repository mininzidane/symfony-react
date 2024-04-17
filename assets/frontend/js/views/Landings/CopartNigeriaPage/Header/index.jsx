import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import Container from 'frontend/js/components/Container';
import Link from 'frontend/js/components/Link';
import AbmLogoSvg from 'frontend/images/shared/logo/abm-logo-blue.svg';
import CopartLoungeLogoSvg from 'frontend/images/shared/partners/copart-lounge-white.svg';
import ChekiLogoSvg from './img/cheki-logo.svg';
import useStyles from './useStyles';

function Header({ pageType }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.grid}>
          <Link href={RouterService.getRoute('home')} className={classes.abmLogoLink}>
            <img src={AbmLogoSvg} className={classes.abmLogoImage} alt="AutoBidMaster" />
          </Link>

          {pageType === 'cheki' && <img src={ChekiLogoSvg} alt="Cheki.com.ng" className={classes.chekiLogo} />}

          <Link routeParams={['copart', null, true]} isTargetBlank>
            <img src={CopartLoungeLogoSvg} alt="Copart" className={classes.copartLogo} />
          </Link>
        </div>
      </Container>
    </div>
  );
}

Header.propTypes = {
  pageType: PropTypes.string.isRequired,
};
export default Header;
