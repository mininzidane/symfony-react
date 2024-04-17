import get from 'lodash/get';
import CountryService from 'frontend/js/api/CountryService';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';

function useContacts(countryIso2) {
  const officeDefault = OfficeLocationsService.getOfficeData(CountryService.COUNTRIES.usa.iso2);
  const officeData = (countryIso2 && OfficeLocationsService.getOfficeData(countryIso2)) || officeDefault || {};
  const { socialContacts, phoneNumber = get(officeDefault, 'phoneNumber', null) } = officeData;
  const { viber, whatsapp, email = get(officeDefault, 'socialContacts.email', null), telegram } = socialContacts || {};

  const viberDefault = get(officeDefault, 'socialContacts.viber', null);
  const whatsappDefault = get(officeDefault, 'socialContacts.whatsapp', null);

  return { phoneNumber, viber, whatsapp, telegram, email, viberDefault, whatsappDefault };
}

export default useContacts;
