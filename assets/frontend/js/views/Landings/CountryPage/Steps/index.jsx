import React from 'react';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import Step from './Step';
import BidSvg from './img/bid.svg';
import RegisterSvg from './img/register.svg';
import SaveSvg from './img/save.svg';
import useStyles from './useStyles';

function StepsSection() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="countryLandingPage.steps.title" />
        </h2>

        <Step
          icon={<img src={RegisterSvg} alt="Icon 1" />}
          title={<FormattedMessage id="countryLandingPage.step1.title" />}
          subtitle={<FormattedMessage id="countryLandingPage.step1.subtitle" />}
        />

        <Step
          icon={<img src={SaveSvg} alt="Icon 2" />}
          title={<FormattedMessage id="countryLandingPage.step2.title" />}
          subtitle={
            <FormattedMessage
              id="countryLandingPage.step2.subtitle"
              values={{
                minDeposit: BuyerPowerService.minDepositAmount,
                maxBid: BuyerPowerService.minDepositThreshold,
              }}
            />
          }
        />

        <Step
          icon={<img src={BidSvg} alt="Icon 3" />}
          title={<FormattedMessage id="countryLandingPage.step3.title" />}
          subtitle={<FormattedMessage id="countryLandingPage.step3.subtitle" />}
        />
      </Container>
    </div>
  );
}

export default StepsSection;
