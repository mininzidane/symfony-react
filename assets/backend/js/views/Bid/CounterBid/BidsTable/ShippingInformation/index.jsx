import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import NumberService from 'backend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function ShippingInformation({ bid }) {
  if (!bid) {
    return null;
  }

  const { activeShippingPreorder } = bid;
  if (!activeShippingPreorder) {
    return null;
  }

  const { destination, orderInformation } = activeShippingPreorder;
  const total = get(orderInformation, 'quote.quote.total');
  const classes = useStyles();

  return (
    <div>
      <div className={classes.shippingDestination}>{destination}</div>
      {total && (
        <div>
          Quote: <b>{NumberService.formatCurrency(total)} USD</b>
        </div>
      )}
    </div>
  );
}

ShippingInformation.propTypes = {
  bid: PropTypes.object.isRequired,
};

export default ShippingInformation;
