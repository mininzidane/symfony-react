import get from 'lodash/get';
import useLot from 'frontend/js/hooks/useLot';
import useCountryId from './useCountryId';
import useDestination from './useDestination';
import useUSPort from './useUSPort';
import usePrice from './usePrice';
import useCountryRates from './useCountryRates';

function useRefinements(state, config) {
  const refinements = {
    ...state,
  };

  const [lot] = useLot(refinements.lotIdOrVin, refinements.auction);

  if (config.input.auctionLocationId) {
    refinements.auctionLocationId = refinements.auctionLocationId || get(lot, 'location.id');
  }
  if (config.input.vehicleCategory) {
    refinements.vehicleCategory = refinements.vehicleCategory || get(lot, 'vehicleCategory');
  }
  if (config.input.price) {
    refinements.price = usePrice(refinements);
  }
  if (config.input.countryId) {
    const { countryId, shippingCountryId } = useCountryId(refinements);
    refinements.countryId = countryId;
    refinements.shippingCountryId = shippingCountryId;
  }
  if (config.input.destinationId) {
    const destination = useDestination(refinements);
    refinements.destinationId = destination && destination.id;
  }
  if (config.input.USPortId) {
    const port = useUSPort(refinements);
    refinements.USPortId = port && port.id;
  }

  const countryRates = useCountryRates(refinements);
  if (countryRates) {
    refinements.vatRateType = countryRates.vatRateType;
    refinements.customsDutyType = countryRates.customsDutyType;
    refinements.countryRatesCurrency = countryRates.currency;
  }

  if (lot) {
    refinements.auction = lot?.inventoryAuction;
  }

  return refinements;
}

export default useRefinements;
