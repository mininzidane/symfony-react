import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import CountryService from 'frontend/js/api/CountryService';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import RouterService from 'frontend/js/api/RouterService';
import Container from 'frontend/js/components/Container';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import Link from 'frontend/js/components/Link';
import AbmLogoSvg from 'frontend/images/shared/logo/abm-logo-white.svg';
import UserIconSmallSvg from 'frontend/images/shared/various/user-icon-small.svg';
import Contacts from './Contacts';
import Subheader from './Subheader';
import CopartLogo from './CopartLogo';
import useStyles from './useStyles';

const staticKeys = {
  ka: {
    login: 'landings.brokerPage.ka.header.logIn',
    register: 'landings.brokerPage.ka.header.registerNow',
  },
  ru: {
    login: 'landings.brokerPage.ru.header.logIn',
    register: 'landings.brokerPage.ru.header.registerNow',
  },
};

function Header({ iso2 }) {
  const classes = useStyles();
  const { isBelowSm, isAboveSm, isAboveLg, isBelowLg } = useBreakpoint();
  const { getRoute } = RouterService;

  const isGE = CountryService.isCountry(iso2, 'georgia');
  const localeStaticKeys = isGE ? staticKeys.ka : staticKeys.ru;

  return (
    <div className={classes.root}>
      <div className={classes.mainHeader}>
        <Container>
          <div className={classes.grid}>
            <div className={classes.logos}>
              <Link href={getRoute('home')}>
                <img src={AbmLogoSvg} alt="AutoBidMaster" className={classes.abmLogo} />
              </Link>

              <Link routeParams={['copart', null, true]} isTargetBlank>
                <CopartLogo iso2={iso2} />
              </Link>
            </div>

            {isAboveLg && <Contacts iso2={iso2} />}

            <div className={classes.buttons}>
              {isAboveSm ? (
                <ButtonOutlined
                  href={getRoute('login')}
                  color="white"
                  size="md"
                  label={<FormattedMessage id={localeStaticKeys.login} />}
                />
              ) : (
                <Link href={getRoute('login')}>
                  <img src={UserIconSmallSvg} alt="Login" />
                </Link>
              )}

              <Button
                href={getRoute('register')}
                size={isBelowSm ? 'sm' : 'md'}
                color="yellow"
                label={<FormattedMessage id={localeStaticKeys.register} />}
              />
            </div>
          </div>
        </Container>
      </div>

      {isBelowLg && <Subheader iso2={iso2} />}
    </div>
  );
}

Header.propTypes = {
  iso2: PropTypes.string.isRequired,
};

export default Header;
