import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import ClearVinLogo from 'frontend/images/shared/logo/cv-logo-circle-and-text.svg';

function Title() {
  return (
    <div className="miw-100 d-f jc-sb ai-ct">
      <span>
        <FormattedMessage id="lotPage.clearVinDetails.vehicleHistory" />
      </span>

      <div className="d-f ai-ct">
        <img src={ClearVinLogo} className="mr-5" alt="" />
        <TooltipOnHover
          maxWidth={320}
          badgeTop={-2}
          isFlipEnabled={false}
          triggerClassName="ga-mouseover-event-tracking"
          triggerProps={{
            'data-ga-event-name': 'vin_details_title',
            'data-ga-event-category': 'lot_page',
            'data-ga-event-label': 'info_pop',
          }}
          content={<FormattedMessage id="lotPage.clearVinDetails.vinDetails.tooltip" />}
        />
      </div>
    </div>
  );
}

export default Title;
