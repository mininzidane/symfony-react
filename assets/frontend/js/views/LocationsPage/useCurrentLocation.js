import { useQuery } from 'react-query';

import UserLocationService from 'frontend/js/api/UserLocationService';

const defaultLocation = {
  lat: '45.5722043',
  lon: '-122.5839188',
  country_code: 'US',
  state_code: 'OR',
  city: 'Portland',
};

function useCurrentLocation() {
  const userLocationService = new UserLocationService();

  const { data, isLoading } = useQuery('currentLocation', () => userLocationService.retrieveUserLocation(true));

  const { lat, lon, country_code, destination_name, state_code, city } = data || {};

  if (!data && !isLoading) {
    return defaultLocation;
  }

  return { lat, lon, country_code, destination_name, state_code, city };
}

export default useCurrentLocation;
