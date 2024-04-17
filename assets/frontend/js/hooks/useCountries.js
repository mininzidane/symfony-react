import { useQuery } from 'react-query';
import CustomerService from '../api/CustomerService';

const DEFAULT = [];

function useCountries() {
  const { data } = useQuery('countries-list', () => CustomerService.getCountriesList(), {
    cacheTime: 15 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return data?.countries || DEFAULT;
}

export default useCountries;
