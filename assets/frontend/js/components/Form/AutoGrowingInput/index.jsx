/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function AutoGrowingInput({ value, onChange, minWidth = 50, className, rootClassName, ...props }) {
  const classes = useStyles();
  const [width, setWidth] = useState();
  const spanRef = useRef();

  function handleChange(e) {
    onChange(e.target.value);
  }

  useEffect(() => {
    setWidth(spanRef.current?.getBoundingClientRect().width);
  }, [value]);

  return (
    <div className={classnames(classes.root, rootClassName)}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{ width, minWidth }}
        className={classnames(classes.input, className)}
        {...props}
      />
      <span ref={spanRef} className={classes.span}>
        {value}
      </span>
    </div>
  );
}

export default AutoGrowingInput;
