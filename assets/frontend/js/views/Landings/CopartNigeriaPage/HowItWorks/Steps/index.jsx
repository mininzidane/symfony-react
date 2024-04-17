import React from 'react';
import BootstrapService from 'frontend/js/api/BootstrapService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Step from './Step';
import ArrowSvg from './img/arrow.svg';
import RegistrationSvg from './img/registration.svg';
import BiddingSvg from './img/bidding.svg';
import PaymentSvg from './img/payment.svg';
import ShippingSvg from './img/shipping.svg';
import useStyles from './useStyles';

function Steps() {
  const classes = useStyles();
  const totalLots = BootstrapService.getAppValue('totalLots');
  const { isAboveMd } = useBreakpoint();

  const Arrow = () => (isAboveMd ? <img src={ArrowSvg} alt="arrow" className={classes.arrow} /> : null);

  return (
    <div className={classes.root}>
      <Step
        title="Registration"
        subtitle="Register at AutoBidMaster.com and complete your profile"
        image={RegistrationSvg}
      />
      <Arrow />
      <Step
        title="Bidding"
        subtitle={`Search and bid for more than ${NumberService.formatNumber(totalLots)} cars and win the auctions`}
        image={BiddingSvg}
      />
      <Arrow />
      <Step
        title="Payment & Documents"
        subtitle="Make payment and sign documents to finalize the sale"
        image={PaymentSvg}
      />
      <Arrow />
      <Step title="Shipping" subtitle="We will ship the car to your <br /> port in Nigeria" image={ShippingSvg} />
    </div>
  );
}

export default Steps;
