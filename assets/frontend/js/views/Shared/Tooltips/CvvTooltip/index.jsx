import React from 'react';
import PropTypes from 'prop-types';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import QuestionMarkTriggerThin from 'frontend/js/components/TooltipOnHover/Triggers/QuestionMarkTriggerThin';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import VisaPng from './img/ic_visa.png';
import AmexPng from './img/ic_amex.png';
import useStyles from './useStyles';

function CvvTooltip({ className }) {
  const classes = useStyles();

  return (
    <TooltipOnHover
      content={
        <div className={classes.root}>
          <img src={VisaPng} alt="Visa" className={classes.icon} />
          <div>
            <FormattedMessage id="creditCardDetailsForm.tooltip.cvv.visa" />{' '}
          </div>

          <img src={AmexPng} alt="Amex" className={classes.icon} />
          <div>
            <FormattedMessage id="creditCardDetailsForm.tooltip.cvv.amex" />{' '}
          </div>
        </div>
      }
      tooltipClassName={classes.tooltipContainer}
      maxWidth={400}
      trigger={<QuestionMarkTriggerThin />}
      triggerClassName={className}
      isFlipEnabled={false}
    />
  );
}

CvvTooltip.propTypes = {
  className: PropTypes.string.isRequired,
};

export default CvvTooltip;
