import React from 'react';
import PropTypes from 'prop-types';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import QuestionMarkTriggerThin from 'frontend/js/components/TooltipOnHover/Triggers/QuestionMarkTriggerThin';
import FormattedMessage from 'frontend/js/components/FormattedMessage';

function SaveCardTooltip({ className }) {
  return (
    <TooltipOnHover
      content={
        <div>
          <FormattedMessage id="creditCardDetailsForm.tooltip.saveCard" />
        </div>
      }
      maxWidth={400}
      trigger={<QuestionMarkTriggerThin />}
      triggerClassName={className}
      isFlipEnabled={false}
    />
  );
}

SaveCardTooltip.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SaveCardTooltip;
