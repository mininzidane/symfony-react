import React, { useContext } from 'react';
import CountryService from 'frontend/js/api/CountryService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import useStyles from './useStyles';

function ExchangeRate() {
  const classes = useStyles();
  const { values, refinements } = useContext(CalculatorContext);
  const { exchangeRate, currency, countryRates } = values;
  const { countryId } = refinements;

  if (CountryService.COUNTRIES.poland.code === countryId && Object.keys(countryRates).length) {
    return (
      <div className={classes.root}>
        <FormattedMessage
          id="vehicleCalculator.eurBasedOnExchangeRate"
          values={{ date: DateTimeService.format(new Date(), 'MM/dd/yyyy') }}
        />
      </div>
    );
  }

  if (!exchangeRate || !currency || exchangeRate === 1) {
    return null;
  }

  return (
    <div className={classes.root}>
      1 USD / {exchangeRate.toFixed(2)} {currency}
    </div>
  );
}

export default ExchangeRate;
