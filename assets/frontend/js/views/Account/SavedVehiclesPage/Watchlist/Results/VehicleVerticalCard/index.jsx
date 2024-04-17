/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';
import Photo from './Photo';
import Header from './Header';
import Details from './Details';
import Controls from './Controls';

function VehicleVerticalCard({ lot }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Photo lot={lot} />

      <div className={classes.content}>
        <Header lot={lot} />
        <Details lot={lot} />
      </div>

      <Controls lot={lot} />
    </div>
  );
}

export default VehicleVerticalCard;
