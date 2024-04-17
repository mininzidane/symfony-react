import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import CountryService from 'frontend/js/api/CountryService';

function useLoungeCountry(iso2) {
  const officeLocations = OfficeLocationsService.getOfficeLocations();
  const { COUNTRIES } = CountryService;
  const { usa, bulgaria, russia } = COUNTRIES;
  const loungesWithoutPageIso2 = [usa.iso2, bulgaria.iso2, russia.iso2];

  return officeLocations.find((c) => {
    const countryIso2 = c.country?.iso_2;
    return c.lounge && !loungesWithoutPageIso2.includes(countryIso2) && countryIso2 === iso2;
  });
}

export default useLoungeCountry;
