import { useContext } from 'react';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import useShippingCountries from 'frontend/js/hooks/useShippingCountries';

function useSelectedCountry() {
  const { shippingCountryId } = useContext(ShippingQuoteContext);
  const countries = useShippingCountries();

  return countries.find((item) => item.id === shippingCountryId);
}

export default useSelectedCountry;
