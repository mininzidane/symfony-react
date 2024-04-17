import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import Button from 'frontend/js/components/Button';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import PromoBannerBgPng from './img/promo-banner-bg.png';
import PromoBannerBgMobilePng from './img/promo-banner-bg-mobile.png';
import useStyles from './useStyles';

function RegisterBanner() {
  const classes = useStyles();

  function handleClick() {
    const LEAD_FORM_ID = 'lounge-lead-form';
    ScrollService.smoothScrollIntoViewById(LEAD_FORM_ID);
    ScrollService.highlightScrollTarget(LEAD_FORM_ID);
  }

  return (
    <ContainerFullScreen
      className={classes.root}
      background={{ xl_x1: PromoBannerBgPng, sm_x1: PromoBannerBgMobilePng, color: '#0A205F' }}
    >
      <Container className={classes.container}>
        <div className={classes.grid}>
          <h2 className={classes.title}>
            <FormattedMessage id="landings.loungeOperatorRecruitmentPage.registerBannerTitle" />
          </h2>
          <div className={classes.buttonWrap}>
            <Button
              onClick={handleClick}
              label={<FormattedMessage id="shared.access.register" />}
              color="yellow"
              isInline
            />
          </div>
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default RegisterBanner;
