/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function SoldViewDetailsButton({ href }) {
  const classes = useStyles();

  return (
    <a href={href} className={classes.root}>
      <FormattedMessage id="shared.cta.viewDetails" />
    </a>
  );
}

export default SoldViewDetailsButton;
