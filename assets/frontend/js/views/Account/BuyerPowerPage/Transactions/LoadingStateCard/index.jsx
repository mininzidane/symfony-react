/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';
import SpinnerWheel from '../../../../../components/SpinnerWheel';

function LoadingStateCard({ minHeight = 300 }) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ minHeight }}>
      <SpinnerWheel size={34} thickness={3} />
    </div>
  );
}

export default LoadingStateCard;
