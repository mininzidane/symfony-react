import CountryService from 'frontend/js/api/CountryService';
import useShippingCountries from 'frontend/js/hooks/useShippingCountries';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import BootstrapService from 'frontend/js/api/BootstrapService';

function useCountryId(refinements) {
  const { countryId } = refinements;
  const userCountryIso2 = CountryService.getUserCountryIso2();
  const countries = useShippingCountries();
  const shippingPreferredDestinationCountry = BootstrapService.getShippingPreferredDestinationCountry();

  if (countryId) {
    return { countryId, shippingCountryId: countryId };
  }

  if (shippingPreferredDestinationCountry) {
    const country = countries.find((v) => v.iso_2 === userCountryIso2);
    const defaultCountryId = country && country.id;
    return { countryId: defaultCountryId, shippingCountryId: shippingPreferredDestinationCountry };
  }

  if (userCountryIso2 !== ShippingOrderService.CountryCodeUS) {
    const country = countries.find((v) => v.iso_2 === userCountryIso2);
    const defaultCountryId = country && country.id;
    return { countryId: defaultCountryId, shippingCountryId: defaultCountryId };
  }

  return { countryId: null, shippingCountryId: null };
}

export default useCountryId;
