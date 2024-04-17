import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';

function BidInfoStatusBadge({ bidStatusKey }) {
  const intl = useIntl();

  const translatedStatus = intl.formatMessage({
    id: `bid.status.${bidStatusKey}`,
  });

  const badgeColorsMap = {
    you_havent_bid: 'gray',
    awaiting_seller_response: 'corn',
    awaiting_approval: 'corn',
    sealed: 'corn',
    seller_countered: 'red',
    not_applicable: 'red',
    lot_sold: 'red',
    outbid: 'red',
    high_bidder: 'green',
    you_won: 'green',
  };

  return <div className={`bid-information__status-badge is-${badgeColorsMap[bidStatusKey]}`}>{translatedStatus}</div>;
}

BidInfoStatusBadge.propTypes = {
  bidStatusKey: PropTypes.string.isRequired,
};

export default BidInfoStatusBadge;
