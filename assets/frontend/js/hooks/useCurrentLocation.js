import { useState } from 'react';
import GooglePlaceService from '../lib/utils/GooglePlaceService';

function useCurrentLocation() {
  const [state, setState] = useState({
    loading: false,
    error: '',
    data: {},
  });

  const error = (err) => {
    setState((prev) => ({ ...prev, error: err || 'Error' }));
  };

  const success = async (position) => {
    const currentPosition = await new GooglePlaceService().currentLocation(position);
    if (currentPosition.status) {
      setState((prev) => ({
        ...prev,
        loading: false,
        data: { ...currentPosition.data, latitude: position.coords?.latitude, longitude: position.coords?.longitude },
      }));
    } else {
      setState((prev) => ({ ...prev, loading: false, data: {}, error: currentPosition.message }));
    }
  };
  const execute = () => {
    if (!navigator.geolocation) {
      error('Geolocation is not supported by your browser');
    } else {
      setState((prev) => ({ ...prev, loading: true }));
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return { ...state, execute };
}

export default useCurrentLocation;
