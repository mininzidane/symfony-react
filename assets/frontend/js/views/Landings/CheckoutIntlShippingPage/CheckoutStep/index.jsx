import React from 'react';
import PropTypes from 'prop-types';
import Benefits from './Benefits';
import Reviews from './Reviews';
import Faq from './Faq';
import Checkout from './Checkout';

function CheckoutStep({ onSuccess }) {
  return (
    <>
      <Checkout onSuccess={onSuccess} />
      <Benefits />
      <Reviews />
      <Faq />
    </>
  );
}

CheckoutStep.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default CheckoutStep;
