import React from 'react';
import PropTypes from 'prop-types';
import CheckoutContextProvider from './_Context';
import useCheckoutContext from './_Context/useCheckoutContext';
import Receipt from './Receipt';
import Payment from './Payment';
import useStyles from './useStyles';

function CheckoutPage({ coupon }) {
  const classes = useStyles();
  const { paid } = useCheckoutContext();

  return <div className={classes.root}>{paid ? <Receipt /> : <Payment coupon={coupon} />}</div>;
}

CheckoutPage.propTypes = {
  coupon: PropTypes.object,
};

CheckoutPage.defaultProps = {
  coupon: null,
};

export default (props) => (
  <CheckoutContextProvider>
    <CheckoutPage {...props} />
  </CheckoutContextProvider>
);
