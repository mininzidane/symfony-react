/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function NoResults({ content }) {
  const classes = useStyles();

  return <div className={classes.root}>{content}</div>;
}

export default NoResults;
