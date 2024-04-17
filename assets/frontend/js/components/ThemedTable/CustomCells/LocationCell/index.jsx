/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react';
import useStyles from './useStyles';

function LocationCell({ lot }) {
  const classes = useStyles();
  const EMPTY_VALUE = '–';
  return (
    <div className={classes.root}>
      {lot && (
        <>
          <div>{lot.locationName || lot.location?.name || EMPTY_VALUE}</div>
          <div>{`${lot.lane || EMPTY_VALUE} / ${lot.gridRow || EMPTY_VALUE}`}</div>
        </>
      )}
      {!lot && <div>{EMPTY_VALUE}</div>}
    </div>
  );
}

export { LocationCell };
