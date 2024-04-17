import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import CountryService from 'frontend/js/api/CountryService';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import RegistrationCard from './RegistrationCard';
import BackgroundJpg from './img/hero-bg.jpg';
import BackgroundMobilePng from './img/hero-bg-mobile.jpg';
import Features from './Features';
import useStyles from './useStyles';

const staticKeys = {
  ka: {
    title: 'landings.brokerPage.ka.hero.title',
    subTitle: 'landings.brokerPage.ka.hero.subtitle',
  },
  ru: {
    title: 'landings.brokerPage.ru.hero.title',
    subTitle: 'landings.brokerPage.ru.hero.subtitle',
  },
};

function Hero({ iso2 }) {
  const classes = useStyles();
  const isGE = CountryService.isCountry(iso2, 'georgia');
  const localeStaticKeys = isGE ? staticKeys.ka : staticKeys.ru;
  const { isAboveSm, isBelowSm } = useBreakpoint();

  return (
    <>
      <div className={classes.root}>
        <ContainerFullScreen
          background={{ xl_x1: BackgroundJpg, sm_x1: BackgroundMobilePng }}
          className={classes.container}
        >
          <Container>
            <div className={classes.grid}>
              <div>
                <h1 className={classes.title}>
                  <FormattedMessage id={localeStaticKeys.title} />
                </h1>
                <p className={classes.subtitle}>
                  <FormattedMessage id={localeStaticKeys.subTitle} />
                </p>
                <Features iso2={iso2} />
              </div>

              {isAboveSm && <RegistrationCard />}
            </div>
          </Container>
        </ContainerFullScreen>
      </div>

      {isBelowSm && <RegistrationCard />}
    </>
  );
}

Hero.propTypes = {
  iso2: PropTypes.string.isRequired,
};

export default Hero;
