import { useQuery } from 'react-query';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';

function useDestinations(countryId) {
  const { data } = useQuery(
    ['destinations-list-data', countryId],
    () => ShippingOrderService.getDestinationsList(countryId),
    {
      enabled: Boolean(countryId) && countryId !== ShippingOrderService.usCountryObj.id,
      cacheTime: 15 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  );

  return data || [];
}

export default useDestinations;
