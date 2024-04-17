import React, { memo } from 'react';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';

function SchemaEventJsonLdBlock({ lot }) {
  if (lot.sold || !lot.saleStartAt) {
    return '';
  }

  const eventLotStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Auction sale of ${lot.description}`,
    description: lot.description,
    image: lot.largeImage,
    offers: {
      '@type': 'Offer',
      url: RouterService.getFullRoute('lot', null, false, { id: lot.id, slug: lot.slug }),
      itemCondition: 'https://schema.org/DamagedCondition',
      availability: 'https://schema.org/InStock',
      price: lot.buyItNow || lot.currentBid || 0,
      priceCurrency: lot.currency,
      validFrom: lot.saleStartAt,
    },
    organizer: {
      '@type': 'Organization',
      name: lot.inventoryAuction.replace('_', ' '),
    },
    startDate: lot.saleStartAt,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: [
      {
        '@type': 'VirtualLocation',
        url: RouterService.getFullRoute('lot', null, false, { id: lot.id, slug: lot.slug }),
      },
      {
        '@type': 'Place',
        name: `Salvage Vehicles @ ${[lot.location?.city, lot.location?.stateCode].filter(Boolean).join(' ')}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: lot.location?.city || '',
          addressRegion: lot.location?.stateCode || '',
          postalCode: lot.location?.zip || '',
          streetAddress: lot.location?.address || '',
        },
      },
    ],
  };

  return <script type="application/ld+json">{JSON.stringify(eventLotStructuredData)}</script>;
}

SchemaEventJsonLdBlock.propTypes = {
  lot: PropTypes.object.isRequired,
};

export default memo(SchemaEventJsonLdBlock);
