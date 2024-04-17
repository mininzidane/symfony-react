/* eslint-disable react/prop-types */
import React from 'react';
import AdbutlerAdvertisement from 'frontend/js/components/AdbutlerAdvertisement';
import useStyles from './useStyles';

function AdButlerBanner({ lot }) {
  if (!lot || lot.FAKE) {
    return null;
  }

  const classes = useStyles();

  return <AdbutlerAdvertisement id="519496" lotId={lot?.id} className={classes.root} />;
}

export default AdButlerBanner;
