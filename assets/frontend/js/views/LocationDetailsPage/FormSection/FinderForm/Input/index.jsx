/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import ClearIndicator from '../Select/SelectComponents/ClearIndicator';
import useStyles from './useStyles';

function Input({ name, value, label, onReset, onChange, onBlur }) {
  const classes = useStyles();
  const inputRef = useRef();

  function handleReset() {
    onReset();
    inputRef.current.focus();
  }

  return (
    <div className={classes.root}>
      <div className={classes.label}>{label}</div>
      <input name={name} value={value} className={classes.input} onChange={onChange} onBlur={onBlur} ref={inputRef} />
      <ClearIndicator onClick={handleReset} />
    </div>
  );
}

export default Input;
