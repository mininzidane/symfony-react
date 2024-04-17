import React, { useCallback, useContext, useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import CurrencyService from 'frontend/js/api/CurrencyService';
import useEventListener from 'frontend/js/hooks/useEventListener';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import DecoratorService from 'frontend/js/lib/utils/DecoratorService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import Refinement from '../Refinement';

function PriceAtAuction() {
  const { refinements, refine, values } = useContext(CalculatorContext);
  const { price } = refinements;

  const [value, setValue] = useState(price);
  const [touched, setTouched] = useState(false);
  const currency = values?.lot?.currencyFeeFormat || CurrencyService.CURRENCY_USD;
  const displayValue = value
    ? NumberService.formatCurrency(value, currency)
    : CurrencyService.CURRENCY_SYMBOLS[currency];

  const throttledRefine = useCallback(
    DecoratorService.throttle((v) => {
      refine({ price: NumberService.parseFloatSafe(v) || 0 });
    }, 300),
    [],
  );

  function handleChange(v) {
    setValue(v);
    throttledRefine(v);
  }

  function handleFocus() {
    setTouched(true);
  }

  useEffect(() => {
    if (!touched) {
      setValue(price);
    } else if (price !== value) {
      refine({ price: NumberService.parseFloatSafe(value) || 0 });
    }
  }, [price, touched, value]);

  const handleMaxBidUpdate = useCallback((event) => {
    const { maxBid, manual } = event.detail;

    if (!maxBid || !manual) {
      return;
    }

    handleChange(event.detail.maxBid);
  }, []);

  useEventListener('MaxBidUpdate', handleMaxBidUpdate);

  return (
    <Refinement
      label={<FormattedMessage id="vehicleCalculator.refinement.priceAtAuction" />}
      input={
        <InputPlane
          onChange={(_, v) => handleChange(v)}
          onFocus={handleFocus}
          id="price"
          name="price"
          mask="numbers"
          value={displayValue}
        />
      }
    />
  );
}

export default PriceAtAuction;
