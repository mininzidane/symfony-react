import React from 'react';
import AdbutlerAdvertisement from 'frontend/js/components/AdbutlerAdvertisement';
import useStyles from './useStyles';

function AdButlerBanner() {
  const classes = useStyles();

  return <AdbutlerAdvertisement id="580183" className={classes.root} />;
}

AdButlerBanner.propTypes = {};

export default AdButlerBanner;
