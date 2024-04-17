import React from 'react';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import CountryService from 'frontend/js/api/CountryService';
import CompanyService from 'frontend/js/api/CompanyService';
import ABMLogoBlackSvg from 'frontend/images/shared/logo/abm-logo-black.svg';

function SeoLocalBusiness() {
  const { COUNTRIES, getUserCountryIso2, isCountryWithOffice } = CountryService;
  const userCountryIso2 = getUserCountryIso2();
  const officeData = OfficeLocationsService.getOfficeData(
    isCountryWithOffice(userCountryIso2) ? userCountryIso2 : COUNTRIES.usa.iso2,
  );

  const { phoneNumber, socialContacts, officeHours, address, city, zip, name } = officeData;
  const { email } = socialContacts || {};

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: CompanyService.companyName,
          image: ABMLogoBlackSvg,
          telephone: phoneNumber?.replace(/[^+\d]/g, ''),
          email,
          openingHours: officeHours,
          address: {
            '@type': 'PostalAddress',
            streetAddress: address,
            addressLocality: city,
            postalCode: zip,
            addressCountry: name,
          },
        })}
      </script>
    </>
  );
}

export default SeoLocalBusiness;
