import React from 'react';
import McafeeBwSvg from 'frontend/images/shared/partners/mcafee-bw.svg';
import NortonSvg from 'frontend/images/shared/partners/norton-bw.svg';
import useStyles from './useStyles';

function SecureServices() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={McafeeBwSvg} alt="McAfee" />
      <img src={NortonSvg} alt="Norton" />
    </div>
  );
}

export default SecureServices;
