/* eslint-disable curly */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import VehicleCalculatorConfigShape from 'frontend/js/lib/propshapes/VehicleCalculatorConfigShape';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import CalculatorContext from './CalculatorContext';
import useRefinements from './useRefinements';
import useValues from './useValues';
import useTotal from './useTotal';
import useAdditionalCharges from './useAdditionalCharges';
import useShippingOptions from './useShippingOptions';

const CalculatorContextProvider = ({ children, defaultValues, config }) => {
  const URLParams = RouterService.getCurrentQueryParams();
  RouterService.removeQueryParams();
  const [state, setState] = useState({
    lotIdOrVin: null,
    price: NaN,
    auctionLocationId: null,
    vehicleCategory: null,
    countryId: null,
    destinationId: null,
    USPortId: null,
    source: null,
    insurance: config.input.insurance ? ShippingOrderService.INSURANCE_TOTAL_LOSS_COVERAGE_ID : null,
    unlimitedAuctionStorage: null,
    auction: LotService.AUCTION_COPART,
    ...defaultValues,
    ...URLParams,
  });

  const refine = (params = {}) => {
    setState((v) => ({ ...v, ...params }));
  };

  const isRateEnabled = useCallback(
    (name, val) => {
      if (val !== undefined) {
        return name in state ? state[name] === val : false;
      }
      return name in state ? state[name] : true;
    },
    [state],
  );

  const refinements = useRefinements(state, config);
  const values = useValues(refinements, config);

  refinements.USPortId = values.shipping.USPortId || refinements.USPortId;

  const { total, subTotal } = useTotal(values, config, isRateEnabled);
  const { additionalCharges } = useAdditionalCharges(values, config, isRateEnabled);

  const { setTouchedFields } = useShippingOptions(refinements, refine, config);

  const handleRefine = (params = {}) => {
    refine(params);
    setTouchedFields(params);
  };

  const data = {
    ...values,
    additionalCharges,
    total,
    subTotal,
  };

  return (
    <CalculatorContext.Provider value={{ values: data, refine: handleRefine, refinements, isRateEnabled, config }}>
      {children}
    </CalculatorContext.Provider>
  );
};

CalculatorContextProvider.defaultProps = {
  defaultValues: {},
  config: {
    input: {
      price: true,
      insurance: false,
      lotIdOrVin: true,
      auctionLocationId: true,
      vehicleCategory: true,
      countryId: true,
      destinationId: true,
      USPortId: true,
    },
    receipt: {
      price: true,
      fees: true,
      shipping: true,
      insurance: true,
      electricFee: true,
      countryRates: true,
      vat: true,
      subTotal: true,
    },
    preorder: true,
  },
};

CalculatorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultValues: PropTypes.object,
  config: VehicleCalculatorConfigShape,
};

export default CalculatorContextProvider;
