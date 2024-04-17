import React from 'react';
import FilterBar from './FilterBar';
import useStyles from './useStyles';

function ConsignmentHeader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FilterBar />
    </div>
  );
}

export default ConsignmentHeader;
