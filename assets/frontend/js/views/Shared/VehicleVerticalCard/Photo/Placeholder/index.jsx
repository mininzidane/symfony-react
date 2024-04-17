import React from 'react';
import Image from 'frontend/js/components/Image';
import useStyles from '../useStyles';

function Placeholder() {
  const classes = useStyles();

  return <Image ratio={75} className={classes.root} fallback lazy />;
}

export default Placeholder;
