/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

function Vin({ className, lot, lotPurchase }) {
  const vin = lotPurchase ? lotPurchase.vehicleVin : lot.vin;

  return (
    <div className={className}>
      <FormattedMessage id="shared.label.vin" />: {vin}
    </div>
  );
}

export default Vin;
