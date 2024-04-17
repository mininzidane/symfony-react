import React from 'react';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function ShippingStatus() {
  const classes = useStyles();
  const { shippingOrder: currentShippingOrder } = useLotWonContext();
  const { shippingOrder } = currentShippingOrder;

  if (shippingOrder && shippingOrder.ehStatus) {
    return (
      <div className={classes.root}>
        <FormattedMessage id="shared.label.status" />: {shippingOrder.ehStatus}
      </div>
    );
  }

  return null;
}

export default ShippingStatus;
