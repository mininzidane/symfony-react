/* eslint-disable no-dupe-args */
/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function Input({ value, onChange, minThreshold, maxThreshold, minValue, formatNumber }) {
  const classes = useStyles();

  function fixValue(nextValue) {
    if (nextValue < minThreshold) {
      return minThreshold;
    }

    if (nextValue > maxThreshold) {
      return maxThreshold;
    }

    return nextValue;
  }

  function handleChange(e) {
    let cleanValue = e.target.value.replace(/\D/g, '');
    if (value === 0) {
      cleanValue = cleanValue.replace(/0/g, '');
    }
    onChange(fixValue(parseInt(cleanValue || 0, 10)));
  }

  function handleBlur() {
    if (!minValue) {
      return;
    }

    if (value < minValue) {
      onChange(minValue);
    }
  }

  return <input className={classes.root} value={formatNumber(value)} onChange={handleChange} onBlur={handleBlur} />;
}

export default Input;
