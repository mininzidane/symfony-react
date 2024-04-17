/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function Type({ title, subtitle, type }) {
  const classes = useStyles({ type });

  return (
    <div>
      <div className={classes.title}>
        <span>{title}</span>
      </div>
      <div className={classes.subtitle}>{subtitle}</div>
    </div>
  );
}

export default Type;
