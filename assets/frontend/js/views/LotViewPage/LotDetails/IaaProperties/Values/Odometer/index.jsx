/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function Odometer({ lot }) {
  const values = [NumberService.formatNumber(lot.odometer), lot.odometerType, lot.odometerBrand];

  return (
    <>
      {values.filter(Boolean).join(' ')}

      <TooltipOnHover
        maxWidth={320}
        badgeTop={-1}
        isFlipEnabled={false}
        triggerClassName="ga-mouseover-event-tracking"
        triggerProps={{
          'data-ga-event-name': 'odometer',
          'data-ga-event-category': 'lot_page',
          'data-ga-event-label': 'info_pop',
        }}
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
