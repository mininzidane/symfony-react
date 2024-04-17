import React, { memo } from 'react';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import StringService from 'frontend/js/lib/utils/StringService';

function SchemaJsonLdBlock({ lot }) {
  function getDamageDescription() {
    const primaryDamage = lot.primaryDamage && StringService.capitalizeEachWord(lot.primaryDamage);
    const secondaryDamage = lot.secondaryDamage && StringService.capitalizeEachWord(lot.secondaryDamage);

    if (primaryDamage !== null && secondaryDamage !== null) {
      return [primaryDamage, secondaryDamage].join(' and ');
    }

    if (primaryDamage !== null) {
      return primaryDamage;
    }

    if (secondaryDamage !== null) {
      return secondaryDamage;
    }

    return 'NO DAMAGE';
  }

  function getSchemaType(vehicleType) {
    switch (vehicleType) {
      case 'C':
        return 'Motorcycle';
      case 'V':
        return 'Car';
      default:
        return null;
    }
  }

  if (lot.sold || !lot.saleStartAt) {
    return '';
  }

  const lotStructuredData = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Vehicle', getSchemaType(lot.vehicleType)].filter(Boolean),
    sku: lot.id,
    name: lot.description,
    description: `This ${
      lot.description
    } is for sale in the Cars auction category and is listed with the following damage types: ${getDamageDescription()} that you can see in the photos.`,
    image: lot.images.map((img) => img.hdr).filter(Boolean),
    brand: {
      '@type': 'Brand',
      name: lot.make,
    },
    mileageFromOdometer: `${lot.odometer} SMI`,
    knownVehicleDamages: getDamageDescription(),
    vehicleConfiguration: [lot.bodyStyle, lot.engineSize].filter(Boolean).join(' '),
    vehicleEngine: {
      '@type': 'EngineSpecification',
      engineType: lot.engineSize,
      fuelType: lot.fuel,
    },
    vehicleInteriorColor: lot.interiorColor || '',
    driveWheelConfiguration: lot.drive || '',
    model: lot.model,
    color: lot.color,
    bodyType: lot.bodyStyle || '',
    productionDate: lot.year,
    vehicleTransmission: lot.transmission,
    offers: {
      '@type': 'Offer',
      url: RouterService.getFullRoute('lot', null, false, { id: lot.id, slug: lot.slug }),
      itemCondition: 'https://schema.org/DamagedCondition',
      availability: 'https://schema.org/InStock',
      price: lot.buyItNow || lot.currentBid || 0,
      priceCurrency: lot.currency,
      validFrom: lot.saleStartAt,
    },
    subjectOf: {
      '@context': 'https://schema.org',
      '@type': 'Event',
      organizer: {
        '@type': 'Organization',
        name: lot.inventoryAuction.replace('_', ' '),
      },
      location: [
        {
          '@type': 'VirtualLocation',
          url: RouterService.getFullRoute('lot', null, false, { id: lot.id, slug: lot.slug }),
        },
        {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: lot.physicalCity || '',
            addressRegion: lot.physicalStateCode || '',
            postalCode: lot.physicalZip || '',
            streetAddress: lot.physicalAddress || '',
          },
          name: `Salvage Vehicles @ ${[lot.physicalCity, lot.physicalStateCode].filter(Boolean).join(' ')}`,
        },
      ],
      name: `Auction sale of ${lot.description}`,
      startDate: lot.saleStartAt,
    },
  };

  return <script type="application/ld+json">{JSON.stringify(lotStructuredData)}</script>;
}

SchemaJsonLdBlock.propTypes = {
  lot: PropTypes.object.isRequired,
};

export default memo(SchemaJsonLdBlock);
