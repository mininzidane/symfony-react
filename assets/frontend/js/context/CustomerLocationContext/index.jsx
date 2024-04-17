import React, { useEffect, createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import UserLocationService from 'frontend/js/api/UserLocationService';

const CustomerLocationContext = createContext({});
const CustomerLocationProvider = ({ storageLocationKey, children, allowFetch }) => {
  const storedLocation = LocalStorageService.get(storageLocationKey);
  const [location, setLocation] = useState(storedLocation);
  const [loading, setIsLoading] = useState(true);

  function updateCustomerLocation(customerLocation, allowReset = false) {
    if (customerLocation || allowReset) {
      setLocation(customerLocation);
      LocalStorageService.set(storageLocationKey, customerLocation);
    }
  }

  const geoLocation = useMemo(() => {
    if (location && location.lat && location.lon) {
      return [location.lon, location.lat].join(',');
    }

    return null;
  }, [location]);

  useEffect(() => {
    (async () => {
      if (!location && allowFetch) {
        const userLocationService = new UserLocationService();
        const userLocation = await userLocationService.retrieveUserLocation();
        if (userLocation) {
          updateCustomerLocation(userLocation);
        }
      }

      setIsLoading(false);
    })();
  }, []);

  return (
    <CustomerLocationContext.Provider
      value={{
        location,
        updateCustomerLocation,
        geoLocation,
        loading,
      }}
    >
      {children}
    </CustomerLocationContext.Provider>
  );
};

CustomerLocationProvider.propTypes = {
  storageLocationKey: PropTypes.string,
  children: PropTypes.node.isRequired,
  allowFetch: PropTypes.bool,
};

CustomerLocationProvider.defaultProps = {
  storageLocationKey: 'Abm::GeoLocation',
  allowFetch: false,
};

function useCustomerLocationContext() {
  return useContext(CustomerLocationContext);
}

export { CustomerLocationProvider, useCustomerLocationContext };
