/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import LanguageService from 'frontend/js/api/LanguageService';
import imageData from 'frontend/js/views/Landings/Shared/OurLounge/data';

function SchemaSearchBlock({ iso2, country }) {
  const intl = useIntl();
  const title = intl.formatMessage({ id: `loungePage.meta.${iso2}.title` });
  const description = intl.formatMessage({ id: `loungePage.meta.${iso2}.desc` });

  const locations = OfficeLocationsService.getOfficeLocations();
  const location = locations.find((l) => l.country.iso_2 === iso2);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    image: imageData[iso2] || [],
    name: title,
    description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: `${location.city}, ${location.country?.name}`,
      postalCode: location.zip,
      addressCountry: location.country?.name,
    },
    email: location.socialContacts?.email,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: location.country?.name,
    },
    url: `https://www.autobidmaster.com/${LanguageService.getCurrentLocale()}/lounges/${country}`,
    telephone: location.phoneNumber,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: location.officeHourData?.hoursFrom,
        closes: location.officeHourData?.hoursTo,
      },
    ],
  };

  return <script type="application/ld+json">{JSON.stringify(structuredData)}</script>;
}

export default memo(SchemaSearchBlock);
