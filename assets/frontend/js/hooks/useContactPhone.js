import { useMemo } from 'react';
import CountryService from 'frontend/js/api/CountryService';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';

function useContactPhone() {
  const userCountryIso2 = CountryService.getUserCountryIso2();

  return useMemo(() => {
    const officeLocations = OfficeLocationsService.getOfficeLocations();
    const intlOfficeLocation = OfficeLocationsService.getIntlOfficeLocation();

    if (CountryService.isDomestic()) {
      const domesticLocation = officeLocations.find(
        (location) => location.country.iso_2 === CountryService.COUNTRIES.usa.iso2,
      );

      return domesticLocation?.phoneNumber;
    }

    const countryOfficeLocation = officeLocations.find((location) => location.country.iso_2 === userCountryIso2);

    if (countryOfficeLocation) {
      return countryOfficeLocation.phoneNumber;
    }

    return intlOfficeLocation.phoneNumber;
  }, [userCountryIso2]);
}

export default useContactPhone;
