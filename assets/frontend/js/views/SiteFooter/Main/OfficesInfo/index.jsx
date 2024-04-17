import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import CountryService from 'frontend/js/api/CountryService';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import CompanyService from 'frontend/js/api/CompanyService';
import CompactInfoBar from './CompactInfoBar';
import OfficeInfo from './OfficeInfo';

function OfficesInfo() {
  const intl = useIntl();
  const { COUNTRIES, getUserCountryIso2, isForeignCountryWithOffice, isDomestic, isUsa } = CountryService;
  const userCountryIso2 = getUserCountryIso2();

  const usaOfficeData = OfficeLocationsService.getOfficeData(COUNTRIES.usa.iso2);

  if (isUsa()) {
    return <CompactInfoBar data={usaOfficeData} />;
  }

  let intlData = {
    country: {
      iso_2: CountryService.COUNTRIES.usa.iso2,
    },
    name: intl.formatMessage({ id: 'shared.label.intlSalesDept' }),
    officeHours: CompanyService.officeHours.label,
    socialContacts: {
      email: CompanyService.emailIntl.raw,
      viber: CompanyService.messenger.viber.formatted,
      whatsapp: CompanyService.messenger.whatsapp.formatted,
    },
    state: {
      code: CompanyService.address.state,
    },
    address: CompanyService.address.street,
    city: CompanyService.address.city,
    zip: CompanyService.address.zip,
  };

  const intlSalesDept = OfficeLocationsService.getIntlOfficeLocation();
  if (intlSalesDept) {
    intlData = intlSalesDept;
  }

  return (
    <div>
      {isForeignCountryWithOffice(userCountryIso2) && (
        <OfficeInfo data={OfficeLocationsService.getOfficeData(userCountryIso2)} />
      )}

      {isDomestic(userCountryIso2) ? <OfficeInfo data={usaOfficeData} /> : <OfficeInfo data={intlData} />}
    </div>
  );
}

export default OfficesInfo;
