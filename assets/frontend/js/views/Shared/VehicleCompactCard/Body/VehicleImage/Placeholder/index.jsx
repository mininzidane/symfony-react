import React from 'react';
import Image from 'frontend/js/components/Image';
import useStyles from '../useStyles';

function Placeholder() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Image ratio={75} className={classes.root} fallback lazy />
    </div>
  );
}

export default Placeholder;
