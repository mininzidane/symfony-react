import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function PreviousOwners() {
  return (
    <>
      <FormattedMessage id="shared.label.recordFound" />

      <TooltipOnHover
        maxWidth={320}
        badgeTop={-1}
        isFlipEnabled={false}
        triggerClassName="ga-mouseover-event-tracking"
        triggerProps={{
          'data-ga-event-name': 'previous_owners',
          'data-ga-event-category': 'lot_page',
          'data-ga-event-label': 'info_pop',
        }}
        content={<FormattedMessage id="lotPage.clearVinDetails.previousOwners.tooltip" />}
      />
    </>
  );
}

export default PreviousOwners;
