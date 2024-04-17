import React from 'react';
import PropTypes from 'prop-types';
import useVehicleHistory from 'backend/js/hooks/useVehicleHistory';
import MicroSaleHistory from 'backend/js/views/_Shared/Micro/SaleHistory';

function SaleHistory({ lot }) {
  const [lots, isLoading] = useVehicleHistory(lot.vin);
  if (isLoading || !lots) {
    return null;
  }

  return <MicroSaleHistory lots={lots} />;
}

SaleHistory.propTypes = {
  lot: PropTypes.object.isRequired,
};

export default SaleHistory;
