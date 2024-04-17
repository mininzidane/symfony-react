import useDestinations from 'frontend/js/hooks/useDestinations';
import BootstrapService from 'frontend/js/api/BootstrapService';

function useDestination(refinements) {
  const { shippingCountryId, destinationId } = refinements;
  const destinations = useDestinations(shippingCountryId);

  const currentDestinationId = destinationId || BootstrapService.getShippingPreferredDestination();

  const destination = destinations.find((item) => item.id === currentDestinationId);
  if (destination) {
    return destination;
  }

  return destinations.find((item) => item.preferred) || destinations[0];
}

export default useDestination;
