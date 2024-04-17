/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LotService from 'frontend/js/api/LotService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function Odometer({ lot }) {
  const odometerString = LotService.getFormattedOdometerString(lot);

  return (
    <>
      {odometerString}

      <TooltipOnHover
        maxWidth={420}
        badgeTop={-1}
        boundariesElement="viewport"
        content={
          <FormattedMessage
            id="lotPage.details.odometer.tooltip"
            values={{
              title: (chunks) => <div className="fw-7 mb-15">{chunks}</div>,
              brand: (chunks) => (
                <div className="fw-3 tt-u mb-5 mt-20" style={{ padding: [[8, 12]], backgroundColor: '#E8D88A' }}>
                  {chunks}
                </div>
              ),
            }}
          />
        }
      />
    </>
  );
}

export default Odometer;
