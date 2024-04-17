import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { FormattedMessage } from 'react-intl-phraseapp';
import Button from 'frontend/js/components/Button';
import QuoteDetails from './QuoteDetails';
import ClockCheckSvg from './img/clock-check.svg';
import useStyles from './useStyles';

function Footer({ quote }) {
  const classes = useStyles();
  const { isSubmitting, submitForm } = useFormikContext();

  return (
    <div className={classes.root}>
      <div className={classes.quoteDetails}>
        <QuoteDetails quote={quote} />
      </div>
      <div className={classes.wrap}>
        <Button
          label={<FormattedMessage id="shippingCalculator.completeOrder.submit" />}
          onClick={submitForm}
          isLoading={isSubmitting}
          className={classes.cta}
          color="blue"
          size="lg"
        />
        <div className={classes.notice}>
          <img src={ClockCheckSvg} alt="Book now" />
          <FormattedMessage id="checkoutIntlShippingPage.checkout.bookNow" />
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  quote: PropTypes.shape({}).isRequired,
};

export default Footer;
