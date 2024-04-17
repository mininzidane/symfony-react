/* eslint-disable react/prop-types */
import React from 'react';
import PrevNextControls from './PrevNextControls';
import useStyles from './useStyles';

function Controls({ onNextLotButtonClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PrevNextControls onNextLotButtonClick={onNextLotButtonClick} />
    </div>
  );
}

export default Controls;
