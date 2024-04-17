import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function SafetyRecalls({ count }) {
  return (
    <>
      <FormattedMessage id="shared.label.records" values={{ count }} />

      <TooltipOnHover
        maxWidth={320}
        badgeTop={-1}
        isFlipEnabled={false}
        triggerClassName="ga-mouseover-event-tracking"
        triggerProps={{
          'data-ga-event-name': 'safety_recalls',
          'data-ga-event-category': 'lot_page',
          'data-ga-event-label': 'info_pop',
        }}
        content={<FormattedMessage id="lotPage.clearVinDetails.safetyRecalls.tooltip" />}
      />
    </>
  );
}

SafetyRecalls.propTypes = {
  count: PropTypes.number,
};

SafetyRecalls.defaultProps = {
  count: 0,
};

export default SafetyRecalls;
