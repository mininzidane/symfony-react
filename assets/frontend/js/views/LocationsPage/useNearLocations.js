import { useState } from 'react';
import useCurrentLocation from './useCurrentLocation';

const useNearLocations = () => {
  const { lat, lon, country_code, destination_name, state_code, city } = useCurrentLocation();
  const [manualLocation, setManualLocation] = useState(null);

  let currentLocationSlug = [state_code || country_code, city || destination_name].filter(Boolean).join(' - ');

  if (manualLocation) {
    currentLocationSlug = [manualLocation.state_code, manualLocation.city]
      // remove empty & equal values
      .filter((c, idx, arr) => Boolean(c) && c !== arr[idx + 1])
      .filter(Boolean)
      .join(' - ');
  }

  return {
    currentLocationSlug: currentLocationSlug || manualLocation?.formattedAddress,
    setManualLocation,
    lat: manualLocation?.lat || lat,
    lng: manualLocation?.lon || lon,
  };
};

export default useNearLocations;
