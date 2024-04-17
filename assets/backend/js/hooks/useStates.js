import { useQuery } from 'react-query';
import LocationService from 'backend/js/api/LocationService';

const DEFAULT = [];

function useStates(countryId) {
  const { data, isLoading } = useQuery(
    ['states-by-country', countryId],
    () => new LocationService().getStatesByCountry(countryId),
    {
      enabled: Boolean(countryId),
      cacheTime: 15 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  );
  return [data?.states || DEFAULT, isLoading];
}

export default useStates;
