import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { useQuery } from 'react-query';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function useShippingOptions(refinements, refine, config) {
  const [touchedFields, setTouched] = useState([]);
  const { isAuthenticated } = useCustomerHelper();
  const { lotIdOrVin, auction } = refinements;
  const [defaultOptions] = useState({
    insurance: config.input.insurance ? ShippingOrderService.INSURANCE_TOTAL_LOSS_COVERAGE_ID : null,
    unlimitedAuctionStorage: false,
  });
  const queryEnabled = isAuthenticated && ValidationService.validateStockNumber(lotIdOrVin) && !!auction;
  const availableFields = [
    'countryId',
    'destinationId',
    'insurance',
    'unlimitedAuctionStorage',
    'brokerFee',
    'customClearance',
  ];
  const debounceSave = useCallback(
    debounce(async (fieldsToSave, values) => {
      if (!ValidationService.validateStockNumber(values.lotIdOrVin) || !values.auction) {
        return;
      }
      const payload = {};
      fieldsToSave.forEach((field) => {
        if (availableFields.includes(field)) {
          payload[field] = values[field];
        }
      });
      setTouched([]);
      if (Object.keys(payload).length > 0) {
        payload.lotNumber = values.lotIdOrVin;
        payload.auction = values.auction;
        try {
          await ShippingOrderService.saveShippingOptions(payload);
        } catch {
          // ignore
        }
      }
    }, 2000),
    [],
  );

  const { data: { shippingOptions = defaultOptions } = {} } = useQuery(
    ['shipping-options', `${lotIdOrVin}_${auction}`],
    () => ShippingOrderService.getShippingOptions(lotIdOrVin, auction),
    {
      enabled: queryEnabled,
      onError: () => debounceSave(touchedFields, refinements),
    },
  );

  useEffect(() => {
    if (!queryEnabled) {
      refine(defaultOptions);
    }
  }, [lotIdOrVin]);

  const setTouchedFields = (params = {}) => setTouched((v) => [...v, ...Object.keys(params)]);

  useEffect(() => {
    if (isAuthenticated && touchedFields.length > 0) {
      debounceSave(touchedFields, refinements);
    }
  }, [touchedFields]);

  useEffect(() => {
    refine({
      ...defaultOptions,
      ...shippingOptions,
    });
  }, [shippingOptions]);

  return { setTouchedFields };
}

export default useShippingOptions;
