import { useEffect, useState } from 'react';
import get from 'lodash/get';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import useAuctionLocation from 'frontend/js/hooks/useAuctionLocation';

function parseQuote(value) {
  return {
    quote: value,
    USPortId: get(value, 'us_port.id'),
    groundAmount: get(value, 'quote.ground'),
    groundDuration: get(value, 'transit.ground', '0').replace(/days/, '').trim(),
    groundDestination: get(value, 'us_port.name', get(value, 'destination.name')),
    oceanAmount: get(value, 'quote.ocean'),
    oceanDuration: get(value, 'transit.ocean', '0').replace(/days/, '').trim(),
    oceanDestination: `${get(value, 'destination.name')}, ${get(value, 'destination.country.iso_2')}`,
    total: get(value, 'quote.total', 0),
    fees: value?.fees || {},
  };
}

function useShipping({ refinements, values }) {
  const isLoadedFlag = { isLoaded: true };
  const [shipping, setShipping] = useState({});

  const { auctionLocationId, shippingCountryId, destinationId, auction } = refinements;
  const { lot } = values;
  const auctionLocation = useAuctionLocation(auctionLocationId, auction);
  const shippingType = ShippingOrderService.getShippingTypeByCountryId(shippingCountryId);

  const params = {
    type: shippingType,
    drivable: lot && lot.drivable,
    destination: destinationId,
    origin_zip: auctionLocation && auctionLocation.zip,
  };

  if (lot && lot.vinHash) {
    params.vin_hash = lot.vinHash;
  } else {
    params.vin = lot && lot.vin;
  }

  if (ShippingOrderService.getQuoteTokenByCountry(shippingCountryId)) {
    params.token = ShippingOrderService.getQuoteTokenByCountry(shippingCountryId);
  }

  async function getShippingQuote() {
    try {
      const quote = await ShippingOrderService.getQuote(params);
      const preparedQuote = parseQuote(quote);

      preparedQuote.total += Object.values(preparedQuote.fees).reduce((acc, curr) => acc + curr, 0);

      preparedQuote.groundAmount += window.customer ? window.customer.towingMarkup : 0;

      setShipping({ ...preparedQuote, ...isLoadedFlag });
    } catch (error) {
      setShipping({ ...isLoadedFlag });
    }
  }

  useEffect(() => {
    if (ShippingOrderService.areQuoteParamsValid(params)) {
      getShippingQuote();
    }
  }, [params.destination, params.origin_zip, params.vin, params.vin_hash]);

  return shipping;
}

export default useShipping;
