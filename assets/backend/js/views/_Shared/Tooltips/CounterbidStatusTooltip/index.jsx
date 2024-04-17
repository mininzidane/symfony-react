import React from 'react';
import Explanation from 'backend/js/components/Explanation';

function CounterbidStatusTooltip() {
  return (
    <>
      Status
      <Explanation>
        <div id="bid-status-tooltip">
          <p className="bid-status-awaiting-approval">
            <span className="bid-status">Awaiting Approval</span>
          </p>
          <p>
            Your bid is currently awaiting approval from the seller. Seller has until 8 pm PST 2 business days after the
            the sale to respond to your bid.
            <br />
            You will receive a confirmation email once the seller has responded. Or you can check this page later.
          </p>
          <p className="bid-status-awaiting-seller-response">
            <span className="bid-status">Awaiting Seller Response</span>
          </p>
          <p>Seller has to approve the bid.</p>
          <p className="bid-status-seller-countered">
            <span className="bid-status">Seller Countered</span>
          </p>
          <p>Seller has countered with another bid.</p>
        </div>
      </Explanation>
    </>
  );
}

export default CounterbidStatusTooltip;
