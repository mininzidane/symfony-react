/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import React, { useState, createRef, useEffect } from 'react';
import classnames from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CarSvg from './img/car.svg';
import useStyles from './useStyles';

function VehiclesInput({ vehiclesNumber, minVehiclesNumber, onChange }) {
  const MAX_VEHICLES_NUMBER = 10;
  const [value, setValue] = useState(vehiclesNumber);
  const [isFocused, setFocused] = useState(false);
  const classes = useStyles();
  const inputRef = createRef();

  function correctValue(val) {
    const v = parseInt(val, 10) || 0;

    if (v < minVehiclesNumber) {
      return minVehiclesNumber;
    }

    if (v > MAX_VEHICLES_NUMBER) {
      return MAX_VEHICLES_NUMBER;
    }

    return v;
  }

  function handleChange(event) {
    let val = parseInt(event.target.value, 10) || '';

    if (val > MAX_VEHICLES_NUMBER) {
      val = MAX_VEHICLES_NUMBER;
    }

    setValue(val);
    onChange(correctValue(val));
  }

  function handleFocus() {
    setFocused(true);
  }

  function handleBlur() {
    const val = correctValue(value);
    onChange(val);
    setValue(val);
  }

  function handleClickAway() {
    setFocused(false);
  }

  function handleIncrease() {
    onChange(correctValue(vehiclesNumber + 1));
    inputRef.current.focus();
  }

  function handleDecrease() {
    onChange(correctValue(vehiclesNumber - 1));
    inputRef.current.focus();
  }

  useEffect(() => {
    setValue(correctValue(vehiclesNumber));
  }, [vehiclesNumber]);

  return (
    <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
      <div className={classes.root}>
        {value > minVehiclesNumber && (
          <button type="button" className={classnames(classes.button, 'is-minus')} onClick={handleDecrease}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#C4C4C4" />
              <rect x="7" y="11" width="10" height="2" fill="white" />
            </svg>
          </button>
        )}

        {value < MAX_VEHICLES_NUMBER && (
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
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <img className={classes.car} src={CarSvg} alt="Car" />
      </div>
    </ClickAwayListener>
  );
}

export default VehiclesInput;
