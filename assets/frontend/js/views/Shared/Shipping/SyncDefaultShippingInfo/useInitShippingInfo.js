import { useContext, useEffect } from 'react';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import UserLocationService from 'frontend/js/api/UserLocationService';
import { useQueryClient } from 'react-query';

function useInitShippingInfo(lot) {
  const {
    initShippingFromCustomer,
    customerDataInited,
    updateShippingInformation,
    quoteInformationIsDirty,
    shippingQuote,
    hasValidQuoteParams,
    markAsDirty,
    requiresCustomQuote,
  } = useContext(ShippingQuoteContext);
  const queryClient = useQueryClient();
  const { customer } = window;

  async function parseLocation(location) {
    if (!location) {
      return null;
    }

    let countryId = (Number.isInteger(location.country) && location.country) || null;
    if (!countryId && !location.zip) {
      const { data } = await queryClient.fetchQuery(
        'countries-list-data',
        () => ShippingOrderService.getShippingCountriesList(),
        { cacheTime: 15 * 60 * 1000, staleTime: 5 * 60 * 1000 },
      );

      const countries = data || [];
      const country = countries.find((item) => item.iso_2 === location.country_code);
      countryId = country && country.id;
    }
    countryId = countryId || ShippingOrderService.CountryIdUS;

    const shippingType = ShippingOrderService.getShippingTypeByCountryId(countryId);
    const isBorderCrossing = shippingType === ShippingOrderService.TypeBorderCrossing;

    return {
      countryId,
      zip: location.zip,
      stateCode: location.state_code,
      city: location.city,
      ...(location.destination && isBorderCrossing && { destinationId: location.destination }),
    };
  }

  async function setDefaultShippingInfo() {
    if (quoteInformationIsDirty || shippingQuote || requiresCustomQuote) {
      return;
    }

    const userLocationService = new UserLocationService();
    let location = userLocationService.getShippingLocation();

    if (!location && !hasValidQuoteParams(lot)) {
      location = await userLocationService.retrieveUserLocation();
    }

    if (location) {
      const info = await parseLocation(location);

      if (info) {
        updateShippingInformation(info);
      }
    } else {
      markAsDirty();
    }
  }

  useEffect(() => {
    if (quoteInformationIsDirty || shippingQuote || requiresCustomQuote) {
      return;
    }

    if (customer && !customerDataInited) {
      initShippingFromCustomer(customer, false);
    } else {
      setDefaultShippingInfo().catch(() => {});
    }
  }, [customerDataInited]);
}

export default useInitShippingInfo;
