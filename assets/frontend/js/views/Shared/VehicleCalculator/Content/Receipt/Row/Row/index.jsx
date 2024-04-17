import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import NumberService from 'frontend/js/lib/utils/NumberService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import InfoTriggerThin from 'frontend/js/components/TooltipOnHover/Triggers/InfoTriggerThin';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import useStyles from './useStyles';

function Row({ title, tooltip, input, value, isLoading, required, field, currency, isMedium, hasAsterisk }) {
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
    <div className={classnames(classes.root, { 'is-medium': isMedium, 'has-input': Boolean(input) })}>
      {field ? (
        <div className={classes.toggle}>
          <Tickbox
            className={classes.tickbox}
            onChange={handleToggle}
            disabled={!value}
            value={Number.isFinite(value) && isChecked}
            name={`field-${field}`}
            id={`field-${field}`}
          >
            {title}
          </Tickbox>

          {Boolean(tooltip) && (
            <span className={classes.tooltipWrap}>
              &nbsp;
              <TooltipOnHover
                content={tooltip}
                trigger={<InfoTriggerThin />}
                triggerClassName={classes.tooltipTrigger}
              />
            </span>
          )}
        </div>
      ) : (
        <div>
          <span>{title}</span>
          {Boolean(tooltip) && (
            <span className={classes.tooltipWrap}>
              &nbsp;
              <TooltipOnHover
                content={tooltip}
                trigger={<InfoTriggerThin />}
                triggerClassName={classes.tooltipTrigger}
              />
            </span>
          )}
        </div>
      )}

      {input && <div className={classes.input}>{input}</div>}

      <div className={classnames(classes.value, { 'is-loading': isLoading, 'is-medium': isMedium })}>
        {Number.isFinite(value) && isChecked ? (
          <>
            <strong>{NumberService.formatCurrency(value, currency)}</strong> {currency} {hasAsterisk && '*'}
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
  input: null,
  value: undefined,
  isLoading: false,
  required: false,
  isMedium: false,
  field: '',
  hasAsterisk: false,
  currency: 'USD',
};

Row.propTypes = {
  title: PropTypes.node.isRequired,
  tooltip: PropTypes.node,
  input: PropTypes.node,
  value: PropTypes.number,
  isLoading: PropTypes.bool,
  required: PropTypes.bool,
  isMedium: PropTypes.bool,
  field: PropTypes.string,
  currency: PropTypes.string,
  hasAsterisk: PropTypes.bool,
};

export default Row;
