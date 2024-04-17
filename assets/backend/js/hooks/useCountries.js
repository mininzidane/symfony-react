import { useQuery } from 'react-query';
import LocationService from 'backend/js/api/LocationService';

const DEFAULT = [];

function useCountries() {
  const { data } = useQuery('countries-list', () => new LocationService().getCountriesList(), {
    cacheTime: 15 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return data?.countries || DEFAULT;
}

export default useCountries;
