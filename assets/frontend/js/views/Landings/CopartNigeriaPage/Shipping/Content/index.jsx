import React from 'react';
import useStyles from './useStyles';

function Content() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>Shipping</div>
      <div className={classes.text}>
        Special international shipping prices for Nigerian customers. Just a few clicks and our friendly agents will
        make the entire shipping process easy.
      </div>
    </div>
  );
}

export default Content;
