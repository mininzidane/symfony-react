import { useContext } from 'react';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import useDestinations from 'frontend/js/hooks/useDestinations';

function useSelectedDestination() {
  const { shippingCountryId, shippingDestinationId } = useContext(ShippingQuoteContext);
  const destinations = useDestinations(shippingCountryId);

  if (shippingDestinationId) {
    return destinations.find((item) => item.id === shippingDestinationId);
  }

  return destinations.find((item) => item.preferred);
}

export default useSelectedDestination;
