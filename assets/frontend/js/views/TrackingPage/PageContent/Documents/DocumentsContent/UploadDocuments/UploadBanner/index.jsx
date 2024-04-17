/* eslint-disable react/prop-types */
import React from 'react';
import AlertSignSvg from 'frontend/images/shared/various/alert-sign-20x20.svg';
import useStyles from './useStyles';

function UploadBanner({ label, cta }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.label}>
        <img className={classes.icon} src={AlertSignSvg} alt="Alert" />
        <div>{label}</div>
      </div>
      {cta}
    </div>
  );
}

UploadBanner.propTypes = {};

export default UploadBanner;
