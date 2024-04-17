/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import useStyles from './useStyles';

function Footer({ exchangeRate, currencyCode }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <FormattedMessage id="shared.label.date" />: {DateTimeService.toLocaleDate(new Date())}
      </div>
      {exchangeRate && exchangeRate !== 1 && currencyCode && (
        <div>
          1 USD / {exchangeRate.toFixed(2)} {currencyCode}
        </div>
      )}
    </div>
  );
}

export default Footer;
