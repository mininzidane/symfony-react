import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import NumberService from 'backend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function BidInput({ value, minValue, onChange, onFocus, onBlur, delta }) {
  const [isFocused, setFocused] = useState(false);
  const { increment } = delta;
  const displayValue = NumberService.formatNumber(value);
  const classes = useStyles();

  function correctValue() {
    let nextVal;

    if (value < minValue) {
      nextVal = minValue;
    } else {
      nextVal = Math.round(value / increment) * increment;
    }

    onChange(nextVal);
  }

  function handleChange(event) {
    const rawValue = parseInt(event.target.value.replace(/\D/g, '').slice(0, 6), 10); // added length limit and removed non-digit chars
    const nextValue = rawValue || 0;

    onChange(nextValue);
  }

  function handleFocus() {
    setFocused(true);
    onFocus();
  }

  function handleBlur() {
    correctValue();
    onBlur();
  }

  function handleClickAway() {
    setFocused(false);
  }

  useEffect(() => {
    correctValue();
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
      <div className={classNames(classes.wrapper, { 'is-focused': isFocused })}>
        <span className={classes.symbol}>$</span>
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={classes.input}
        />
      </div>
    </ClickAwayListener>
  );
}

BidInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.number.isRequired,
  delta: PropTypes.shape({
    increment: PropTypes.number,
    decrement: PropTypes.number,
  }).isRequired,
  minValue: PropTypes.number,
};

BidInput.defaultProps = {
  minValue: 1,
  onFocus: () => {},
  onBlur: () => {},
};

export default BidInput;
