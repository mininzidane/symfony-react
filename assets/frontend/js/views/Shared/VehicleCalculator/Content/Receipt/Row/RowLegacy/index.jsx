import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import NumberService from 'frontend/js/lib/utils/NumberService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import Switch from 'frontend/js/components/Form/Switch';
import InfoTriggerThin from 'frontend/js/components/TooltipOnHover/Triggers/InfoTriggerThin';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import useStyles from './useStyles';

function Row({ title, tooltip, value, isLoading, required, field, currency, hasAsterisk }) {
  const classes = useStyles();
  const { refine, isRateEnabled } = useContext(CalculatorContext);
  const isChecked = isRateEnabled(field);

  if (!required && (value === undefined || value === 0)) {
    return null;
  }

  function handleToggle() {
    refine({ [field]: !isChecked });
  }

  return (
    <div className={classes.root}>
      {Boolean(field) && (
        <div className={classes.switch}>
          <Switch isChecked={Number.isFinite(value) && isChecked} onChange={handleToggle} disabled={!value} />
        </div>
      )}

      <div>
        <span>{title}</span>
        {Boolean(tooltip) && (
          <span className={classes.tooltipWrap}>
            &nbsp;
            <TooltipOnHover content={tooltip} trigger={<InfoTriggerThin />} triggerClassName={classes.tooltipTrigger} />
          </span>
        )}
      </div>

      <div className={classnames(classes.value, { 'is-loading': isLoading })}>
        {Number.isFinite(value) && isChecked ? (
          <>
            <strong>{NumberService.formatCurrency(value)}</strong> {currency} {hasAsterisk && '*'}
          </>
        ) : (
          '------'
        )}
      </div>
    </div>
  );
}

Row.defaultProps = {
  tooltip: null,
  value: undefined,
  isLoading: false,
  required: false,
  field: '',
  currency: 'USD',
  hasAsterisk: false,
};

Row.propTypes = {
  title: PropTypes.node.isRequired,
  tooltip: PropTypes.node,
  value: PropTypes.number,
  isLoading: PropTypes.bool,
  required: PropTypes.bool,
  field: PropTypes.string,
  currency: PropTypes.string,
  hasAsterisk: PropTypes.bool,
};

export default Row;
