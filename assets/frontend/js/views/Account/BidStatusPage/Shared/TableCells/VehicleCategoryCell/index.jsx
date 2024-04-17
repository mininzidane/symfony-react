/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

const VEHICLE_CATEGORY = {
  SEDAN: 1,
  SUV: 2,
  PICKUP: 3,
  MOTORCYCLE: 4,
  OVERSIZED: [5, 6],
};

function VehicleCategoryCell({ vehicleCategory }) {
  if (!vehicleCategory) {
    return null;
  }

  if (VEHICLE_CATEGORY.SEDAN === vehicleCategory) {
    return <FormattedMessage id="shared.vehicleCategory.sedan" />;
  }

  if (VEHICLE_CATEGORY.SUV === vehicleCategory) {
    return <FormattedMessage id="shared.vehicleCategory.SUV" />;
  }

  if (VEHICLE_CATEGORY.PICKUP === vehicleCategory) {
    return <FormattedMessage id="shared.vehicleCategory.pickup" />;
  }

  if (VEHICLE_CATEGORY.MOTORCYCLE === vehicleCategory) {
    return <FormattedMessage id="shared.vehicleCategory.motorcycle" />;
  }

  if (VEHICLE_CATEGORY.OVERSIZED.includes(vehicleCategory)) {
    return <FormattedMessage id="shared.vehicleCategory.oversized" />;
  }

  return null;
}

export default VehicleCategoryCell;
