import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import useShippingCountries from 'frontend/js/hooks/useShippingCountries';

function useOrderInfo(quote) {
  const countries = useShippingCountries();

  function getDestinationString(isDomestic, destination, isBorderCrossing, port, country) {
    let result;
    if (isDomestic) {
      result = `${destination.city}, ${destination.state_code} ${destination.zip}`;
    } else if (isBorderCrossing) {
      result = port;
    } else {
      result = `${destination.name}${country ? `, ${country}` : ''}`;
    }
    return result;
  }

  function getCountryName(countryId) {
    if (!(countryId && countries && countries.length > 0)) {
      return undefined;
    }
    return countries.filter((item) => item.id === countryId)[0].name;
  }

  if (!quote) {
    return {};
  }

  const { destination, transit, type, vehicle, lot_number: lotId } = quote;
  const { image: vehicleImage, make, model, year, vin } = vehicle;

  const isDomestic = type === ShippingOrderService.TypeDomestic;
  const isBorderCrossing = type === ShippingOrderService.TypeBorderCrossing;
  const isInternational = type === ShippingOrderService.TypeInternational;

  const port = isBorderCrossing && `${destination.name.split(' - ')[1]}, ${destination.name.split(' - ')[0]}`;
  const country = getCountryName(destination.country_id);

  const origin = quote.origin && `${quote.origin.city}, ${quote.origin.state_code} ${quote.origin.zip}`;
  const destinationString = getDestinationString(isDomestic, destination, isBorderCrossing, port, country);

  const ymm = `${year} ${make} ${model}`;
  const estDelivery = isInternational ? transit.ocean : transit.ground;

  function getTotal() {
    const additionalCharges = quote?.additionalCharges?.total || 0;
    const total = quote?.quote?.total || 0;
    return additionalCharges + total;
  }

  return {
    destination: destinationString,
    ymm,
    vehicleImage,
    origin,
    lotId,
    vin,
    estDelivery,
    isInternational,
    price: getTotal(),
  };
}

export default useOrderInfo;
