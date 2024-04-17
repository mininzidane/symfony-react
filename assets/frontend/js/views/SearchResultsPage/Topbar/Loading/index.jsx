import React from 'react';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from '../useStyles';

function TopbarLoading() {
  const classes = useStyles();
  const { isBelowXs } = useBreakpoint();

  return (
    <div className={classes.barContainer}>
      <div className={classes.filtersLoading} />
      {isBelowXs && <div className={classes.mobileTools} />}
    </div>
  );
}

export default TopbarLoading;
