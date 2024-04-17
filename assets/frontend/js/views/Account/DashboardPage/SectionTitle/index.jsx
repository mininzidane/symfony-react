/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function SectionTitle({ text }) {
  const classes = useStyles();

  return <h2 className={classes.root}>{text}</h2>;
}

export default SectionTitle;
