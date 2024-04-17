/* eslint-disable react/prop-types */
import React from 'react';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import useStyles from './useStyles';

function Component({ onClick, label, isLoading }) {
  const classes = useStyles();

  return (
    <button type="button" onClick={onClick} className={classes.root}>
      {isLoading ? <SpinnerWheel size={20} /> : label}
    </button>
  );
}

export default Component;
