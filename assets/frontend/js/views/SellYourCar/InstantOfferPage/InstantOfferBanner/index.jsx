import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import Button from 'frontend/js/components/Button';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import PromoBannerBgJpg from './img/promo-banner-bg.jpg';
import PromoBannerBgMobileJpg from './img/promo-banner-bg-mobile.jpg';
import useStyles from './useStyles';

function InstantOfferBanner({ v2 }) {
  const classes = useStyles();

  function handleClick() {
    if (v2) {
      document.getElementById('sell-your-car-cta')?.click();
      return;
    }
    const LEAD_FORM_ID = 'sell-your-car-lead-form';
    ScrollService.smoothScrollIntoViewById(LEAD_FORM_ID);
    ScrollService.highlightScrollTarget(LEAD_FORM_ID);
  }

  return (
    <ContainerFullScreen
      className={classes.root}
      background={{ xl_x1: PromoBannerBgJpg, sm_x1: PromoBannerBgMobileJpg, color: '#000' }}
    >
      <Container className={classes.container}>
        <div className={classes.grid}>
          <h2 className={classes.title}>
            <FormattedMessage id="sellYourCarPage.instantOfferBanner.title" />
          </h2>
          <div className={classes.buttonWrap}>
            <Button
              onClick={handleClick}
              label={<FormattedMessage id="sellYourCarPage.instantOfferBanner.cta" />}
              color="yellow"
              isInline
            />
          </div>
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

InstantOfferBanner.propTypes = {
  v2: PropTypes.bool,
};

InstantOfferBanner.defaultProps = {
  v2: false,
};

export default InstantOfferBanner;
