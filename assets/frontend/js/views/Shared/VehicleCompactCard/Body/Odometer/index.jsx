/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LotService from 'frontend/js/api/LotService';

function Odometer({ className, lot }) {
  const hasLot = Boolean(lot);

  if (hasLot) {
    const odometerString = LotService.getFormattedOdometerString(lot);
    if (odometerString) {
      return (
        <div className={className}>
          <FormattedMessage id="shared.label.odometer" />: {odometerString}
        </div>
      );
    }
  }

  return null;
}

export default Odometer;
