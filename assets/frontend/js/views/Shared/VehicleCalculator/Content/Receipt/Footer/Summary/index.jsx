/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import CurrencyService from 'frontend/js/api/CurrencyService';
import useStyles from './useStyles';

function Summary({ currency, value, isFinalPrice }) {
  const classes = useStyles();
  const currencyFormat = currency || CurrencyService.CURRENCY_USD;

  return (
    <div className={classes.root}>
      <div>
        {isFinalPrice ? (
          <FormattedMessage id="vehicleCalculator.finalEstimatedPrice" />
        ) : (
          <>
            <FormattedMessage id="vehicleCalculator.subTotal" />*
          </>
        )}
      </div>
      <div className={classes.value}>
        <strong>{NumberService.formatCurrency(value, currencyFormat)}</strong> {currencyFormat}
      </div>
    </div>
  );
}

export default Summary;
