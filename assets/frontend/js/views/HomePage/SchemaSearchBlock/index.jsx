import React, { memo } from 'react';
import CompanyService from 'frontend/js/api/CompanyService';
import RouterService from 'frontend/js/api/RouterService';
import Logo from 'frontend/images/static/logo/site-logo.svg';

function SchemaSearchBlock() {
  const mainStructuredData = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Place', 'Website'],
    url: RouterService.getFullRoute('home'),
    logo: Logo,
    name: CompanyService.companyNameLegal,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CompanyService.officeLat,
      longitude: CompanyService.officeLng,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${RouterService.getFullRoute('searchResults')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    sameAs: [CompanyService.socials.facebook, CompanyService.socials.twitter],
  };

  return <script type="application/ld+json">{JSON.stringify(mainStructuredData)}</script>;
}

export default memo(SchemaSearchBlock);
