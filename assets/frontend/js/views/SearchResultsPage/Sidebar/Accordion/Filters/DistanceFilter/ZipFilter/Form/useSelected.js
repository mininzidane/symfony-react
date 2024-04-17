import { useState, useEffect } from 'react';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import LocationService from 'frontend/js/api/LocationService';
import NumberService from 'frontend/js/lib/utils/NumberService';

function useSelected(section, refinements) {
  const [state, setState] = useState(() => {
    const refinement = refinements.find((v) => v.section === section);

    if (!refinement) {
      return {
        distance: null,
        location: LocalStorageService.get('abmSearchLocation'),
      };
    }

    const { UOrigin, distance } = refinement.values;

    const location = LocalStorageService.get('abmSearchLocation');
    if (location && [location.lat, location.lon].join(',') === UOrigin) {
      return {
        location,
        distance: NumberService.castToNumberSafe(distance, null),
      };
    }

    return {
      location: null,
      distance: NumberService.castToNumberSafe(distance, null),
    };
  });

  useEffect(() => {
    const { UOrigin } = refinements.find((v) => v.section === section)?.values || {};

    if (!UOrigin || state.location) {
      return;
    }

    const [lat, lon] = UOrigin.split(',');
    LocationService.getLocationInformationByLatAndLong(lat, lon).then((location) => {
      setState({
        ...state,
        location: {
          ...location,
          lat,
          lon,
        },
      });
    });
  }, []);

  return [state, setState];
}

export default useSelected;
