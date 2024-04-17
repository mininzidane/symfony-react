import React from 'react';
import ImageMultiRes from 'frontend/js/components/Image/ImageMultiRes';
import WorldMap1xPng from './img/world-map@1x.png';
import WorldMap2xPng from './img/world-map@2x.png';
import useStyles from './useStyles';

function Map() {
  const classes = useStyles();

  return <ImageMultiRes x1={WorldMap1xPng} x2={WorldMap2xPng} alt="Map" className={classes.root} ratio={51} lazy />;
}

export default Map;
