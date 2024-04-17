import React from 'react';
import PropTypes from 'prop-types';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import QuestionMarkTriggerThin from 'frontend/js/components/TooltipOnHover/Triggers/QuestionMarkTriggerThin';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Link from 'frontend/js/components/Link';

function PhoneTooltip({ className }) {
  return (
    <TooltipOnHover
      content={
        <div>
          <FormattedMessage
            id="creditCardDetailsForm.tooltip.phoneNumber"
            values={{
              a: (chunks) => (
                <Link routeParams={['contactUs']} isTargetBlank>
                  {chunks}
                </Link>
              ),
            }}
          />
        </div>
      }
      maxWidth={400}
      trigger={<QuestionMarkTriggerThin />}
      triggerClassName={className}
      isFlipEnabled={false}
    />
  );
}

PhoneTooltip.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PhoneTooltip;
