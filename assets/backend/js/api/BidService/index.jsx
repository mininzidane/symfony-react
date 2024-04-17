import BaseApiService from '../BaseApiService';

class BidService extends BaseApiService {
  submitBid(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/inventory/bid`), payload).then((data) => data.data);
  }

  submitMistypedBid(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/inventory/mistyped-bid`), payload).then(
      (data) => data.data,
    );
  }

  submitBuyItNow(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/inventory/buyitnow`), payload).then((data) => data.data);
  }

  submitMakeAnOffer(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/inventory/makeanoffer`), payload).then((data) => data.data);
  }

  submitLiveBid(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/inventory/live-bid`), payload).then((data) => data.data);
  }

  keepCurrentBid(bidId) {
    return this.post(this.buildProtectedRequestPath(`api/v1/bid/${bidId}/keep-current`)).then((data) => data.data);
  }

  acceptMinimumBid(bidId, payload = {}) {
    return this.post(this.buildProtectedRequestPath(`api/v1/bid/${bidId}/accept-minimum`), payload).then(
      (data) => data.data,
    );
  }

  increaseCounterBid(bidId, payload = {}) {
    return this.post(this.buildProtectedRequestPath(`api/v1/bid/${bidId}/increase-counter-bid`), payload).then(
      (data) => data.data,
    );
  }

  getCounterBids(params) {
    return this.get(this.buildProtectedRequestPath(`api/v1/bid/counter-bids?${params}`)).then((data) => data.data);
  }

  getBidDetails(bidId) {
    return this.get(this.buildProtectedRequestPath(`api/v1/bid/${bidId}/details`)).then((data) => data.data);
  }

  getCounterBidStats() {
    return this.get(this.buildProtectedRequestPath(`api/v1/bid/counter-bid-stats`)).then((data) => data.data);
  }

  getCounterBidFilterStats() {
    return this.get(this.buildProtectedRequestPath(`api/v1/bid/counter-bid-filter-stats`)).then((data) => data.data);
  }

  updatePriority(bidId, payload) {
    return this.put(this.buildProtectedRequestPath(`api/v1/bid/${bidId}/update-priority`), payload).then(
      (data) => data.data,
    );
  }

  getInventoryBidDetails(auction, stockNumber, customerId) {
    const params = { auction, stockNumber, customerId };
    const queryString = BaseApiService.objectToQueryParams(params);
    return this.get(this.buildProtectedRequestPath(`api/v1/bid/inventory-details?${queryString}`)).then(
      (data) => data.data,
    );
  }
}

BidService.STATUS_YOU_HAVENT_BID = "You Haven't bid";
BidService.STATUS_HIGH_BIDDER = 'High Bidder'; // Copart's "Winning"
BidService.STATUS_OUTBID = 'Outbid';
BidService.STATUS_SEALED = 'Sealed';
BidService.STATUS_AWAITING_APPROVAL = 'Awaiting Approval';
BidService.STATUS_AWAITING_SELLER_RESPONSE = 'Awaiting Seller Response';
BidService.STATUS_SELLER_COUNTERED = 'Seller Countered';
BidService.STATUS_YOU_WON = 'You Won';
BidService.STATUS_PAYMENT_DUE = 'Payment Due';
BidService.STATUS_UNKNOWN = 'Unknown';

BidService.COUNTER_BID_STATUSES = [
  BidService.STATUS_AWAITING_APPROVAL,
  BidService.STATUS_AWAITING_SELLER_RESPONSE,
  BidService.STATUS_SELLER_COUNTERED,
];

BidService.WINNING_BID_STATUES = [
  BidService.STATUS_HIGH_BIDDER,
  BidService.STATUS_AWAITING_APPROVAL,
  BidService.STATUS_AWAITING_SELLER_RESPONSE,
  BidService.STATUS_SELLER_COUNTERED,
  BidService.STATUS_YOU_WON,
  BidService.STATUS_PAYMENT_DUE,
];

BidService.PRIORITY_LOW = 0;
BidService.PRIORITY_MEDIUM = 1;
BidService.PRIORITY_HIGH = 2;

BidService.PRIORITY_OPTIONS = [
  { label: 'LOW', value: BidService.PRIORITY_LOW },
  { label: 'MEDIUM', value: BidService.PRIORITY_MEDIUM },
  { label: 'HIGH', value: BidService.PRIORITY_HIGH },
];

BidService.CATEGORY_TEMPLATE = 'bid';

export default BidService;
