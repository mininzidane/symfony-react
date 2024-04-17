/* eslint-disable react/prop-types */
import React from 'react';
import WatchlistControl from './WatchlistControl';
import PrevNextControls from './PrevNextControls';
import useStyles from './useStyles';

function Controls({ lot }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <WatchlistControl lot={lot} />
      <PrevNextControls />
    </div>
  );
}

export default Controls;
