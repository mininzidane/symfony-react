/* eslint-disable react/prop-types */
import React from 'react';
import SocialLinks from 'frontend/js/views/Shared/SocialLinks';
import useStyles from './useStyles';

function Component(props) {
  const classes = useStyles();

  return <SocialLinks className={classes.root} {...props} />;
}

export default Component;
