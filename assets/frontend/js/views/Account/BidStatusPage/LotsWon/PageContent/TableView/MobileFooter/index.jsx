import React from 'react';
import { ActionsCell } from 'frontend/js/components/ThemedTable/LotsWonCells';
import useStyles from './useStyles';

function Footer() {
  const classes = useStyles();
  return <ActionsCell hasShippingActions className={classes.root} />;
}

export default Footer;
