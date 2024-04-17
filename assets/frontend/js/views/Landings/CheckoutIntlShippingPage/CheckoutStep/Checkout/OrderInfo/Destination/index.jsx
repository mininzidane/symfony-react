import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ShieldSvg from './img/shield.svg';
import useStyles from './useStyles';

function Destination({ destination }) {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();

  return isAboveSm ? (
    <div className={classes.root}>
      <h1 className={classes.title}>
        <FormattedMessage
          id="checkoutIntlShippingPage.checkout.title"
          values={{ companyName: 'Copart', destination }}
        />
      </h1>

      <div className={classes.promo}>
        <div className={classes.promoIcon}>
          <img src={ShieldSvg} alt="Insurance" />
        </div>

        <div className={classes.promoTitle}>
          <FormattedMessage id="checkoutIntlShippingPage.checkout.promo.globalShippingServices" />
        </div>
      </div>
    </div>
  ) : (
    <div className={classes.mobileTitle}>
      <FormattedMessage id="checkoutIntlShippingPage.checkout.shortTitle" values={{ destination }} />
    </div>
  );
}

Destination.defaultProps = {
  destination: '',
};

Destination.propTypes = {
  destination: PropTypes.string,
};

export default Destination;
