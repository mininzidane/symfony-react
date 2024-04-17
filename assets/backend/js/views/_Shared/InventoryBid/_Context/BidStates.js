import LotService from 'backend/js/api/LotService';

const STATE_PRELIMINARY = 'preliminary';
const STATE_COUNTERBIDDING = 'counterbidding';
const STATE_LIVE_BIDDING = 'live-bidding';
const STATE_SOLD = 'sold';
const STATE_UNKNOWN = 'unknown';

function determineBidStatus(status, currentBid) {
  if (status === LotService.STATUS_PREBIDDING) {
    return STATE_PRELIMINARY;
  }

  if (LotService.COUNTER_BID_STATUSES.includes(status) && currentBid) {
    return STATE_COUNTERBIDDING;
  }

  if (status === LotService.STATUS_PREBIDDING_CLOSED || status === LotService.STATUS_LIVE_BIDDING) {
    return STATE_LIVE_BIDDING;
  }

  return STATE_UNKNOWN;
}

export { STATE_PRELIMINARY, STATE_COUNTERBIDDING, STATE_LIVE_BIDDING, STATE_SOLD, STATE_UNKNOWN, determineBidStatus };
