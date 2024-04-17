import React, { useEffect, useState } from 'react';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import CountryService from 'frontend/js/api/CountryService';
import Hero from './Hero';
import InfoCards from './InfoCards';
import Directory from './Directory';

function ContactUsPage() {
  const userCountryIso2 = CountryService.getUserCountryIso2();
  const isDomestic = CountryService.isDomestic();
  const locations = OfficeLocationsService.getOfficeLocations();
  const intlLocation = OfficeLocationsService.getIntlOfficeLocation();
  const [selectedLocation, setSelectedLocation] = useState(null);

  function setOffice(countryCode) {
    const matchingOffice = OfficeLocationsService.getOfficeData(countryCode);

    if (!matchingOffice) {
      if (!isDomestic && !CountryService.isUsa(countryCode) && intlLocation) {
        setSelectedLocation(intlLocation);
      } else {
        const main =
          locations.find((office) => office.headquarters) ||
          OfficeLocationsService.getOfficeData(CountryService.COUNTRIES.usa.iso2);
        setSelectedLocation(main);
      }
    } else {
      setSelectedLocation(matchingOffice);
    }
  }

  useEffect(() => {
    if (!locations.length) {
      return;
    }

    setOffice(userCountryIso2);
  }, [userCountryIso2]);

  return (
    <>
      <Hero location={selectedLocation} onCountryChange={setOffice} />
      <InfoCards />
      <Directory locations={locations} />
    </>
  );
}

export default ContactUsPage;
