/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classnames from 'classnames';
import { ClickAwayListener } from '@material-ui/core';
import useStyles from './useStyles';

function TimeIntervalSelect({ options, selectedOptionLabel, onSelect, isDisabled }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(option) {
    setIsOpen(false);
    onSelect(option);
  }

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className={classes.root}>
        <button
          type="button"
          className={classnames(classes.trigger, { 'is-active': isOpen, 'is-disabled': isDisabled })}
          onClick={() => setIsOpen(true)}
        >
          {selectedOptionLabel}
        </button>

        <div className={classnames(classes.menu, isOpen && 'is-open')}>
          {options.map((option) => (
            <button type="button" onClick={() => handleClick(option)} key={option.key}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default TimeIntervalSelect;
