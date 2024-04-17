import React from 'react';
import Container from 'frontend/js/components/Container';
import { FormattedMessage } from 'react-intl-phraseapp';
import Step1Svg from './img/step1.svg';
import Step2Svg from './img/step2.svg';
import Step3Svg from './img/step3.svg';
import ArrowSvg from './img/arrow.svg';
import CarsSvg from './img/cars.png';
import useStyles from './useStyles';

function Steps() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container>
        <>
          <h2 className={classes.title}>
            <FormattedMessage id="stateLandingPage.guide.its_easy_to_save_thousands" />
          </h2>

          <div className={classes.steps}>
            <div className={classes.step}>
              <div className={classes.circle}>
                <div className={classes.badge}>1</div>
                <img src={Step1Svg} width={48} alt="Step 1" />
              </div>

              <div className={classes.details}>
                <strong>
                  <FormattedMessage id="landings.abmIsEasyToUse.shared.register.cta" />
                </strong>
                <br />
                <span>
                  <FormattedMessage id="landings.abmIsEasyToUse.shared.itsFastEasyAndSecure" />
                </span>
              </div>
            </div>

            <img src={ArrowSvg} className={classes.arrow} width={30} alt="Arrow" />

            <div className={classes.step}>
              <div className={classes.circle}>
                <div className={classes.badge}>2</div>
                <img src={Step2Svg} width={43} alt="Step 2" />
              </div>

              <div className={classes.details}>
                <strong>
                  <FormattedMessage id="landings.abmIsEasyToUse.shared.startBidding" />
                </strong>
                <br />
                <span>
                  <FormattedMessage id="stateLandingPage.guide.search_and_bid_on_vehicles" />
                </span>
              </div>
            </div>

            <img src={ArrowSvg} className={classes.arrow} width={30} alt="Arrow" />

            <div className={classes.step}>
              <div className={classes.circle}>
                <div className={classes.badge}>3</div>
                <img src={Step3Svg} width={56} alt="Step 3" />
              </div>

              <div className={classes.details}>
                <strong>
                  <FormattedMessage id="stateLandingPage.guide.complete_your_purchase" />
                </strong>
                <br />
                <span>
                  <FormattedMessage id="stateLandingPage.guide.finalize_documentation_and_payment" />
                </span>
              </div>
            </div>
          </div>

          <div className={classes.details}>
            <img src={CarsSvg} alt="Cars" />
          </div>
        </>
      </Container>
    </section>
  );
}

export default Steps;
