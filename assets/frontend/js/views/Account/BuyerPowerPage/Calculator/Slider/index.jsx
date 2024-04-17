import React from 'react';
import PropTypes from 'prop-types';
import MuiSlider from '@material-ui/core/Slider';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function getMarks() {
  const { isBelowSm } = useBreakpoint();
  const step = isBelowSm ? 2000 : 1000;
  const stepsCount = isBelowSm ? 25 : 50;
  const marks = [];

  for (let index = 0; index <= stepsCount; index++) {
    marks.push({ value: index * step });
  }

  return marks;
}

function Slider({ value, maxValue, onChange, step, valueAboveLimit }) {
  const isValueCloseToMax = value > maxValue * 0.95;
  const classes = useStyles({ isValueCloseToMax });

  const { formatCurrency } = NumberService;

  function valueLabelFormat(val) {
    return formatCurrency(valueAboveLimit || val);
  }

  return (
    <MuiSlider
      valueLabelFormat={valueLabelFormat}
      classes={classes}
      step={step}
      value={value}
      min={0}
      max={maxValue}
      onChange={onChange}
      marks={getMarks()}
      valueLabelDisplay="on"
    />
  );
}

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  valueAboveLimit: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
