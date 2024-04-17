/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function Row({ label, value, condition, href }) {
  const classes = useStyles();

  return (
    <>
      {Boolean(condition) && (
        <div className={classes.root}>
          <a href={href} className={classes.label}>
            {label}:
          </a>
          <a href={href} className={classes.value}>
            {value}
          </a>
        </div>
      )}
    </>
  );
}

export default Row;
