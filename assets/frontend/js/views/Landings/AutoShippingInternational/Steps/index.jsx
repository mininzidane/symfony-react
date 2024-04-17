import React from 'react';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BootstrapService from 'frontend/js/api/BootstrapService';
import Step1Svg from './img/step-1.svg';
import Step2Svg from './img/step-2.svg';
import Step3Svg from './img/step-3.svg';
import Step4Svg from './img/step-4.svg';
import Step5Svg from './img/step-5.svg';
import ArrowSvg from './img/arrow.svg';
import useStyles from './useStyles';

function Steps() {
  const classes = useStyles();
  const countryName = BootstrapService.getAppValue('countryName');

  return (
    <div className={classes.root}>
      <Container>
        <FormattedMessage id="homePage.intl.howToBuyAndShip.title" values={{ countryName }} className={classes.title} />

        <div className={classes.steps}>
          <div className={classes.step}>
            <img src={Step1Svg} alt="Step 1" width={65} />
            <div className={classes.stepLabel}>
              <FormattedMessage id="joinAuctions.howToBid.step" /> 1
            </div>
            <div className={classes.stepDesc}>
              <FormattedMessage id="autoShippingInternationalPage.step1" />
            </div>
          </div>

          <img className={classes.arrow} src={ArrowSvg} alt="Arrow" />

          <div className={classes.step}>
            <img src={Step2Svg} alt="Step 2" width={90} />
            <div className={classes.stepLabel}>
              <FormattedMessage id="joinAuctions.howToBid.step" /> 2
            </div>
            <div className={classes.stepDesc}>
              <FormattedMessage id="autoShippingInternationalPage.step2" />
            </div>
          </div>

          <img className={classes.arrow} src={ArrowSvg} alt="Arrow" />

          <div className={classes.step}>
            <img src={Step3Svg} alt="Step 3" width={92} />
            <div className={classes.stepLabel}>
              <FormattedMessage id="joinAuctions.howToBid.step" /> 3
            </div>
            <div className={classes.stepDesc}>
              <FormattedMessage id="autoShippingInternationalPage.step3" />
            </div>
          </div>

          <img className={classes.arrow} src={ArrowSvg} alt="Arrow" />

          <div className={classes.step}>
            <img src={Step4Svg} alt="Step 4" width={52} />
            <div className={classes.stepLabel}>
              <FormattedMessage id="joinAuctions.howToBid.step" /> 4
            </div>
            <div className={classes.stepDesc}>
              <FormattedMessage id="autoShippingInternationalPage.step4" />
            </div>
          </div>

          <img className={classes.arrow} src={ArrowSvg} alt="Arrow" />

          <div className={classes.step}>
            <img src={Step5Svg} alt="Step 5" width={60} />
            <div className={classes.stepLabel}>
              <FormattedMessage id="joinAuctions.howToBid.step" /> 5
            </div>
            <div className={classes.stepDesc}>
              <FormattedMessage id="autoShippingInternationalPage.step5" values={{ country: countryName }} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Steps;
