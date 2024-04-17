/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function Tabs({ onChange, index }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <button
        type="button"
        onClick={() => onChange(0)}
        className={classnames(classes.tab, { 'is-active': index === 0 })}
      >
        Exterior
      </button>
      <button
        type="button"
        onClick={() => onChange(1)}
        className={classnames(classes.tab, { 'is-active': index === 1 })}
      >
        Interior
      </button>
    </div>
  );
}

export default Tabs;
