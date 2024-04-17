import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function TitleBrandHistory() {
  return (
    <>
      <FormattedMessage id="shared.label.recordFound" />

      <TooltipOnHover
        maxWidth={320}
        badgeTop={-1}
        isFlipEnabled={false}
        triggerClassName="ga-mouseover-event-tracking"
        triggerProps={{
          'data-ga-event-name': 'title_brand_history',
          'data-ga-event-category': 'lot_page',
          'data-ga-event-label': 'info_pop',
        }}
        content={<FormattedMessage id="lotPage.clearVinDetails.titleBrandHistory.tooltip" />}
      />
    </>
  );
}

export default TitleBrandHistory;
