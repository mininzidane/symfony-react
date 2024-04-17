import { useContext, useEffect, useState } from 'react';
import UserLocationService from 'frontend/js/api/UserLocationService';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import get from 'lodash/get';
import useSelectedDestination from '../useSelectedDestination';
import useSelectedCountry from '../useSelectedCountry';

function useUpdateDefaultShippingLocation() {
  const { quoteInformationIsDirty, shippingStateCode, shippingCity, shippingZip, isBorderCrossing } =
    useContext(ShippingQuoteContext);
  const [saveIsRequired, setSaveIsRequired] = useState(false);
  const destination = useSelectedDestination();
  const country = useSelectedCountry();

  useEffect(() => {
    if (quoteInformationIsDirty) {
      setSaveIsRequired(true);
    }
  }, [quoteInformationIsDirty]);

  useEffect(() => {
    if (!saveIsRequired || !country || (isBorderCrossing() && !destination)) {
      return;
    }

    const location = {
      destination: get(destination, 'id'),
      destination_name: get(destination, 'name'),
      country: get(country, 'id'),
      country_name: get(country, 'name'),
      country_code: get(country, 'iso_2'),
      zip: shippingZip,
      city: shippingCity,
      state_code: shippingStateCode,
    };

    const userLocationService = new UserLocationService();
    userLocationService.setShippingLocation(location);

    setSaveIsRequired(false);
  }, [saveIsRequired, country, destination]);
}

export default useUpdateDefaultShippingLocation;
