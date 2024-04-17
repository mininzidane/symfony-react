import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import NumberService from 'backend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function BidInformationInput({ value, minValue, onChange, delta }) {
  const classes = useStyles();
  const { increment, decrement } = delta;
  const { formatUsCurrency } = NumberService;
  const displayValue = value ? formatUsCurrency(value) : '$';
  const inputRef = createRef();

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

  function handleBlur() {
    correctValue();
  }

  function handleIncrease() {
    onChange(value + increment);
    inputRef.current.focus();
  }

  function handleDecrease() {
    onChange(value - decrement);
    inputRef.current.focus();
  }

  useEffect(() => {
    correctValue();
  }, []);

  return (
    <div className={classes.root}>
      <input
        type="text"
        ref={inputRef}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={classes.input}
      />

      {value > minValue && (
        <button type="button" className={classnames(classes.control, 'is-minus')} onClick={handleDecrease}>
          <svg width="12" height="12" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="12" height="2" fill="#C4C4C4" />
          </svg>
        </button>
      )}

      <button type="button" className={classnames(classes.control, 'is-plus')} onClick={handleIncrease}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect width="12" height="2" fill="#C4C4C4" y="5" />
          <rect width="2" height="12" fill="#C4C4C4" x="5" />
        </svg>
      </button>
    </div>
  );
}

BidInformationInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  delta: PropTypes.shape({
    increment: PropTypes.number,
    decrement: PropTypes.number,
  }).isRequired,
  minValue: PropTypes.number,
};

BidInformationInput.defaultProps = {
  minValue: 1,
};

export default BidInformationInput;
