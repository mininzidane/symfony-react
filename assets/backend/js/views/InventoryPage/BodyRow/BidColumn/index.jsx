import React from 'react';
import BidInformation from './BidInformation';
import SaleInformation from './SaleInformation';

function BidColumn() {
  return (
    <div className="col-lg-4">
      <div className="mb-25">
        <BidInformation />
      </div>

      <SaleInformation />
    </div>
  );
}

export default BidColumn;
