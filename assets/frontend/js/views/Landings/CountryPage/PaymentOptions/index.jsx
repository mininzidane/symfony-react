import React from 'react';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CreditCardsSvg from 'frontend/images/shared/payment-services/cc-grid.svg';
import WireTransferSvg from 'frontend/images/shared/payment-services/wire-transfer-blue.svg';
import useStyles from './useStyles';

function PaymentOptions() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.title}>
          <FormattedMessage id="countryLandingPage.paymentsOptions.title" />
        </div>

        <div className={classes.grid}>
          <div className={classes.section}>
            <div className={classes.imageContainer}>
              <img src={CreditCardsSvg} width="83" alt="Credit Cards" />
            </div>
            <strong>
              <FormattedMessage id="countryLandingPage.creditCard.title" />
            </strong>
            <div>
              <FormattedMessage id="countryLandingPage.creditCard.subtitle" />
            </div>
          </div>
          <div className={classes.separator} />
          <div className={classes.section}>
            <div className={classes.imageContainer}>
              <img src={WireTransferSvg} width="82" alt="Wire Transfer" />
            </div>
            <strong>
              <FormattedMessage id="countryLandingPage.wireTransfer.title" />
            </strong>
            <div>
              <FormattedMessage id="countryLandingPage.wireTransfer.subtitle" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

PaymentOptions.propTypes = {};

export default PaymentOptions;
