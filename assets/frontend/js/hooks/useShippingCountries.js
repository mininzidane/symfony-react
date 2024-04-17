import { useQuery } from 'react-query';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';

function useShippingCountries() {
  const { data } = useQuery('countries-list-data', () => ShippingOrderService.getShippingCountriesList(), {
    cacheTime: 15 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return data || [];
}

export default useShippingCountries;
