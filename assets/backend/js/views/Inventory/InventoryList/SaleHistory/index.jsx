import React from 'react';
import PropTypes from 'prop-types';
import useSalesHistory from 'backend/js/hooks/useSalesHistory';
import MicroSaleHistory from 'backend/js/views/_Shared/Micro/SaleHistory';
import PurchaseHistory from '../PurchaseHistory';

function SaleHistory({ vin }) {
  const { lots, purchases } = useSalesHistory(vin, true);
  return (
    <>
      <MicroSaleHistory lots={lots} />
      <PurchaseHistory purchases={purchases} />
    </>
  );
}

SaleHistory.propTypes = {
  vin: PropTypes.string.isRequired,
};

export default SaleHistory;
