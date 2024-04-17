import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import CountryService from 'frontend/js/api/CountryService';

function useOfficeData() {
  const { COUNTRIES, getUserCountryIso2, isCountryWithOffice } = CountryService;
  const userCountryIso2 = getUserCountryIso2();
  const officeData = OfficeLocationsService.getOfficeData(
    isCountryWithOffice(userCountryIso2) ? userCountryIso2 : COUNTRIES.usa.iso2,
  );

  return officeData;
}

export default useOfficeData;
