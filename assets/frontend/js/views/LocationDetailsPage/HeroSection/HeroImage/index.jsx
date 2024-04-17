/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function HeroImage({ src, isLg }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.root, isLg && 'is-lg')}>
      <img src={src} className={classes.image} alt="location" />
    </div>
  );
}

export default HeroImage;
