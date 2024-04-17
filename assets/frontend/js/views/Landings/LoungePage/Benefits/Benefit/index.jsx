/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function Benefit({ icon, title, desc }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <img src={icon} alt="benefit" />
      </div>
      <h3 className={classes.caption}>{title}</h3>
      <div className={classes.desc}>{desc}</div>
    </div>
  );
}

export default Benefit;
