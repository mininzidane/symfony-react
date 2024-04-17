import React, { memo } from 'react';
import PropTypes from 'prop-types';
import StringService from 'frontend/js/lib/utils/StringService';
import { FormattedMessage } from 'react-intl-phraseapp';

const staticKeysMap = {
  awaiting_approval: 'bid.status.awaiting_approval',
  awaiting_seller_response: 'bid.status.awaiting_seller_response',
  high_bidder: 'bid.status.high_bidder',
  lot_sold: 'bid.status.lot_sold',
  not_applicable: 'bid.status.not_applicable',
  outbid: 'bid.status.outbid',
  sealed: 'bid.status.sealed',
  seller_countered: 'bid.status.seller_countered',
  you_havent_bid: 'bid.status.you_havent_bid',
  you_won: 'bid.status.you_won',
};

const BidStatusFormattedMessage = ({ bidStatus }) => (
  <FormattedMessage
    id={
      staticKeysMap[StringService.getStatusKeyFormString(bidStatus)] || StringService.getStatusKeyFormString(bidStatus)
    }
  />
);

BidStatusFormattedMessage.propTypes = {
  bidStatus: PropTypes.string.isRequired,
};

export default memo(BidStatusFormattedMessage);
