import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import CountryService from 'frontend/js/api/CountryService';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import Button from 'frontend/js/components/Button';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import PromoBannerBgJpg from './img/promo-banner-bg.jpg';
import PromoBannerBgMobileJpg from './img/promo-banner-bg-mobile.jpg';
import useStyles from './useStyles';

const staticKeys = {
  ka: {
    title: `landings.brokerPage.ka.features.banner.title`,
    cta: `landings.brokerPage.ka.features.banner.cta`,
  },
  ru: {
    title: `landings.brokerPage.ru.features.banner.title`,
    cta: `landings.brokerPage.ru.features.banner.cta`,
  },
};

function RegisterCtaSection({ iso2 }) {
  const classes = useStyles();
  const isGE = CountryService.isCountry(iso2, 'georgia');
  const localeStaticKeys = isGE ? staticKeys.ka : staticKeys.ru;

  function handleClick() {
    ScrollService.smoothScrollIntoViewById('register-card-container');

    setTimeout(() => {
      document.getElementById('register-first-name').focus();
    }, 1000);
  }

  return (
    <div className={classes.root}>
      <ContainerFullScreen
        className={classes.containerFullScreen}
        background={{ xl_x1: PromoBannerBgJpg, sm_x1: PromoBannerBgMobileJpg }}
      >
        <Container className={classes.container}>
          <div className={classes.grid}>
            <h2 className={classes.title}>
              <FormattedMessage id={localeStaticKeys.title} />
            </h2>
            <div className={classes.buttonWrap}>
              <Button
                onClick={handleClick}
                label={<FormattedMessage id={localeStaticKeys.cta} />}
                color="yellow"
                isInline
              />
            </div>
          </div>
        </Container>
      </ContainerFullScreen>
    </div>
  );
}

RegisterCtaSection.propTypes = {
  iso2: PropTypes.string.isRequired,
};

export default RegisterCtaSection;
