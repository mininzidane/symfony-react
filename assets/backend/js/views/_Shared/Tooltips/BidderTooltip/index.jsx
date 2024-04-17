import React from 'react';
import Explanation from 'backend/js/components/Explanation';

function BidderTooltip() {
  return (
    <>
      Bidder
      <Explanation>
        The account number that this bid was placed under. Not the same as the member ID number.
      </Explanation>
    </>
  );
}

export default BidderTooltip;
