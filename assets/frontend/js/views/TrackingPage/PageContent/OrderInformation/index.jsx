import React from 'react';
import PropTypes from 'prop-types';
import InternationalShipping from './InternationalShipping';
import DomesticShipping from './DomesticShipping';

function OrderInformation({ shippingOrder }) {
  return (
    <>
      {shippingOrder.internationalType ? (
        <InternationalShipping shippingOrder={shippingOrder} />
      ) : (
        <DomesticShipping shippingOrder={shippingOrder} />
      )}
    </>
  );
}

OrderInformation.defaultProps = {
  shippingOrder: null,
};

OrderInformation.propTypes = {
  shippingOrder: PropTypes.object,
};

export default OrderInformation;
