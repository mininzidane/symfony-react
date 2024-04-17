/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function Tickbox({ name, value, error, label, onChange }) {
  const classes = useStyles();
  const hasError = Boolean(error);

  function handleChange() {
    onChange(name, !value);
  }

  return (
    <div className={classes.root}>
      <div
        onClick={handleChange}
        onKeyPress={handleChange}
        rel="noopener noreferrer"
        role="button"
        tabIndex={0}
        className={classnames(classes.tickbox, { 'is-completed': value, 'is-error': hasError })}
      >
        <div className={classes.checkboxWrap}>
          <div className={classnames(classes.checkbox, !value && classes.emptyCheckbox)}>
            {value && (
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.27653L3.5 7.77269L11 0.783447" stroke="white" strokeWidth="2" />
              </svg>
            )}
          </div>
        </div>
        <div className={classes.label}>{label}</div>
      </div>
      {hasError && <div className={classes.error}>{error}</div>}
    </div>
  );
}

export default memo(Tickbox);
