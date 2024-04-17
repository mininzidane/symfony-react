/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'frontend/js/components/Image';
import useStyles from './useStyles';

function VehicleVerticalCardPhoto({ lot }) {
  const classes = useStyles();
  const { largeImage, description } = lot;

  return <Image ratio={75} src={largeImage} fallback lazy className={classes.root} alt={description} />;
}

export default VehicleVerticalCardPhoto;
