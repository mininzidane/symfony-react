import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import CircleNumber1Png from './img/circle-number-1.png';
import CircleNumber2Png from './img/circle-number-2.png';
import CircleNumber3Png from './img/circle-number-3.png';
import Step1ImgPng from './img/step-1-img.png';
import Step2ImgPng from './img/step-2-img.png';
import Step3ImgPng from './img/step-3-img.png';
import DotsLinePng from './img/dots-line.png';
import useStyles from './useStyles';
import SignUpCta from '../Shared/SignUpCta';

function Steps() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container>
        <h4 className={classes.title}>
          <FormattedMessage id="stateLandingPage.guide.its_easy_to_save_thousands" />
        </h4>

        <div className={classes.stepsGrid}>
          <div className={classes.cell}>
            <img src={CircleNumber1Png} alt="Step 1" />
            <div className={classes.caption}>
              <FormattedMessage id="header.register" />
            </div>
            <div className={classes.subcaption}>
              <FormattedMessage id="landings.abmIsEasyToUse.shared.itsFastEasyAndSecure" />
            </div>
            <img src={Step1ImgPng} alt="Step 1" />
          </div>

          <div className={classes.cell}>
            <img src={CircleNumber2Png} alt="Step 2" />
            <div className={classes.caption}>
              <FormattedMessage id="shared.label.bidding" />
            </div>
            <div className={classes.subcaption}>
              <FormattedMessage id="stateLandingPage.guide.search_and_bid_on_vehicles" />
            </div>
            <img src={Step2ImgPng} alt="Step 2" />
          </div>

          <div className={classes.cell}>
            <img src={CircleNumber3Png} alt="Step 3" />
            <div className={classes.caption}>
              <FormattedMessage id="shared.label.buying" />
            </div>
            <div className={classes.subcaption}>
              <FormattedMessage id="stateLandingPage.promo.payOnYourAuctionWin" />
            </div>
            <img src={Step3ImgPng} alt="Step 3" />
          </div>

          <div className={classes.line} style={{ backgroundImage: `url(${DotsLinePng})` }} />
        </div>

        <div className={classes.buttonWrap}>
          <SignUpCta />
        </div>
      </Container>
    </section>
  );
}

export default Steps;
