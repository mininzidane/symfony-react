/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function Total({ value }) {
  const classes = useStyles();
  const { formatCurrency } = NumberService;

  return (
    <div className={classes.root}>
      <div>
        <FormattedMessage id="vehicleCalculator.finalPrice" />
      </div>
      <div>
        <strong>{formatCurrency(value)}</strong> USD
      </div>
    </div>
  );
}

export default Total;
