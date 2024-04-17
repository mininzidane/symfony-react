/* eslint-disable react/prop-types */
import React from 'react';
import CopartAuction from './CopartAuction';
import OtherAuction from './OtherAuction';

const WatchlistCellStyles = { style: { paddingLeft: 15, paddingRight: 15, width: 80 } };

function WatchlistCell({ lot, lotPurchase }) {
  return (
    <>
      {lot && <CopartAuction lot={lot} />}
      {!lot && lotPurchase && <OtherAuction lotPurchase={lotPurchase} />}
    </>
  );
}

export { WatchlistCell, WatchlistCellStyles };
