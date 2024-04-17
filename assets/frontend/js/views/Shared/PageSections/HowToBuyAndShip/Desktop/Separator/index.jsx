import React from 'react';
import useStyles from './useStyles';

function Separator() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.lineContainer}>
        <div className={classes.line} />
      </div>
    </div>
  );
}

export default Separator;
