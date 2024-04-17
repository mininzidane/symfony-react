/* eslint-disable react/prop-types */
import React from 'react';
import Title from './Title';
import Controls from './Controls';
import useStyles from './useStyles';

function PreviewModalHeader({ lot }) {
  const classes = useStyles();
  const { description } = lot;

  return (
    <div className={classes.root}>
      <Title text={description} />
      <Controls lot={lot} />
    </div>
  );
}

export default PreviewModalHeader;
