import React from 'react';
import Print from './Print';
import Copy from './Copy';
import useStyles from './useStyles';

function PrintSection() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Print />
      <Copy />
    </div>
  );
}

export default PrintSection;
