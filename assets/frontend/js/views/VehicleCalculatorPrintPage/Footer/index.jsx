import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormattedMessage id="vehicleCalculator.print.footer" />
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
