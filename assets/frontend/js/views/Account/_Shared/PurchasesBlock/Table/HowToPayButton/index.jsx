/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Button from 'frontend/js/components/Button';
import useStyles from './useStyles';

function HowToPayButton({ onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        label={<FormattedMessage id="depositsPage.transactions.purchases.howToPay" />}
        size="sm"
        isInline
        className={classes.cta}
        onClick={onClick}
      />
    </div>
  );
}

export default HowToPayButton;
