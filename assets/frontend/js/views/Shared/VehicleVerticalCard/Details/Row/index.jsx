/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function Row({ className, label, value, condition }) {
  const classes = useStyles();

  return condition ? (
    <div className={classnames(classes.root, className)}>
      <span className={classes.label}>{label}:</span>
      <span className={classes.value}>{value}</span>
    </div>
  ) : null;
}

export default Row;
