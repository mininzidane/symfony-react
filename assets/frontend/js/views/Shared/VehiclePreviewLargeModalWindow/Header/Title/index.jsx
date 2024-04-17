/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function PreviewModalTitle({ text }) {
  const classes = useStyles();

  return <div className={classes.root}>{text}</div>;
}

export default PreviewModalTitle;
