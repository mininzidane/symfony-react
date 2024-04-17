/* eslint-disable */
import React from 'react';
import CheckmarkRoundBlueSvg from 'frontend/images/shared/various/checkmark-round-blue.svg';
import useStyles from './useStyles';

function ServiceItem({ title, subtitle }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <img src={CheckmarkRoundBlueSvg} width={24} height={24} alt="Checkmark" />
      </div>
      <div>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.subtitle}>{subtitle}</div>
      </div>
    </div>
  );
}

export default ServiceItem;
