/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function Row({ label, value, condition }) {
  const classes = useStyles();

  return (
    <>
      {Boolean(condition) && (
        <div className={classes.root}>
          <span className={classes.label}>{label}:</span> <span className={classes.value}>{value}</span>
        </div>
      )}
    </>
  );
}

export default Row;
