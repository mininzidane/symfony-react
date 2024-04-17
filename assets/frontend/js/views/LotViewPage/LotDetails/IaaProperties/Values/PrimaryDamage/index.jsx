/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function PrimaryDamage({ lot }) {
  return (
    <>
      {lot.primaryDamage}

      <TooltipOnHover
        maxWidth={320}
        badgeTop={-1}
        isFlipEnabled={false}
        triggerClassName="ga-mouseover-event-tracking"
        triggerProps={{
          'data-ga-event-name': 'primary_damage',
          'data-ga-event-category': 'lot_page',
          'data-ga-event-label': 'info_pop',
        }}
        content={
          <FormattedMessage
            id="shared.label.primaryDamage.tooltip"
            values={{
              title: (chunks) => <div className="fw-7 mb-15">{chunks}</div>,
              br: <br />,
            }}
          />
        }
      />
    </>
  );
}

export default PrimaryDamage;
