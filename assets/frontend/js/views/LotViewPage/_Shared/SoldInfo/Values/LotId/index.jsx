/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'frontend/js/components/Link';
import LotService from 'frontend/js/api/LotService';

function LotId({ id, auction = null }) {
  if (!id) {
    return <div>—</div>;
  }

  let slug = '';
  if (auction && auction.toLowerCase() === LotService.AUCTION_IAA.toLowerCase()) {
    slug = 'ADD';
  }

  return (
    <Link routeParams={['lot', null, false, { id, slug }]} style={{ fontWeight: '400' }}>
      {id}
    </Link>
  );
}

export default LotId;
