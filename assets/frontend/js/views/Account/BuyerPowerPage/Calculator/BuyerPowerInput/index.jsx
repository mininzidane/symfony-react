import React, { useState, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function BuyerPowerInput({ value, onChange, minValue, maxValue, step, isMbpAboveLimit }) {
  const [isFocused, setFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const classes = useStyles();
  const inputRef = createRef();

  function correctValue(v) {
    if (v < minValue) {
      return minValue;
    }

    if (v > maxValue) {
      return maxValue;
    }

    return Math.round(v / step) * step;
  }

  function handleChange(event) {
    const rawValue = parseInt(event.target.value.replace(/\D/g, ''), 10) || 0;
    setDisplayValue(rawValue);
  }

  function handleFocus() {
    setFocused(true);
  }

  function handleClickAway() {
    const nextVal = correctValue(displayValue);
    setDisplayValue(nextVal);
    onChange(nextVal);
    setFocused(false);
  }

  function handleIncrease() {
    onChange(value + step);
    inputRef.current.focus();
  }

  function handleDecrease() {
    onChange(value - step);
    inputRef.current.focus();
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const nextVal = correctValue(displayValue);
      onChange(nextVal);
      setDisplayValue(nextVal);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [displayValue]);

  return (
    <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
      <div className={classes.root}>
        {value > minValue && !isMbpAboveLimit && (
          <button type="button" className={classnames(classes.button, 'is-minus')} onClick={handleDecrease}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#C4C4C4" />
              <rect x="7" y="11" width="10" height="2" fill="white" />
            </svg>
          </button>
        )}

        {value < maxValue && !isMbpAboveLimit && (
          <button type="button" className={classnames(classes.button, 'is-plus')} onClick={handleIncrease}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#C4C4C4" />
              <path d="M7 11H17V13H7V11Z" fill="white" />
              <path d="M13 7L13 17H11L11 7L13 7Z" fill="white" />
            </svg>
          </button>
        )}

        <input
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          className={classnames(classes.input, { 'is-focused': isFocused })}
          ref={inputRef}
          value={displayValue ? NumberService.formatCurrency(displayValue) : '$0'}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
    </ClickAwayListener>
  );
}

BuyerPowerInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  isMbpAboveLimit: PropTypes.bool.isRequired,
};

export default BuyerPowerInput;
