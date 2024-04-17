import BaseApiService from '../BaseApiService';

class BidService extends BaseApiService {
  static dispatchBidPlacedEvent() {
    window.dispatchEvent(new CustomEvent('bidPlaced'));
  }

  submitPreliminaryBid(lotId, payload) {
    return this.post(this.buildRequestPath(`lots/${lotId}/bid`, true), payload).then(({ data }) => {
      BidService.dispatchBidPlacedEvent();
      return data;
    });
  }

  submitMistypedBid(lotId, payload) {
    return this.post(this.buildRequestPath(`lots/${lotId}/mistyped-bid`, true), payload).then(({ data }) => {
      BidService.dispatchBidPlacedEvent();
      return data;
    });
  }

  submitBuyItNow(lotId, payload) {
    return this.post(this.buildRequestPath(`lots/${lotId}/buyitnow`, true), payload).then(({ data }) => {
      BidService.dispatchBidPlacedEvent();
      return data;
    });
  }

  submitMakeAnOffer(lotId, payload) {
    return this.post(this.buildRequestPath(`lots/${lotId}/makeanoffer`, true), payload).then(({ data }) => data);
  }

  submitKeepCurrentBid(lotId, payload) {
    return this.post(this.buildRequestPath(`lots/${lotId}/keepcurrentbid`, true), payload).then(({ data }) => data);
  }

  submitAcceptMinimumBid(lotId, payload) {
    return this.post(this.buildRequestPath(`lots/${lotId}/acceptminimumbid`, true), payload).then(({ data }) => data);
  }

  submitCounterBid(lotId, payload) {
    return this.post(this.buildRequestPath(`lots/${lotId}/counterbid`, true), payload).then(({ data }) => data);
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

BidService.COUNTER_BID_STATUSES = [
  BidService.STATUS_AWAITING_APPROVAL,
  BidService.STATUS_AWAITING_SELLER_RESPONSE,
  BidService.STATUS_SELLER_COUNTERED,
];

BidService.BID_TYPES = {
  MAX_BID: 'Max Bid',
  MONSTER_BID: 'Monster Bid',
};

BidService.isCounterBidStatus = (statusString) => BidService.COUNTER_BID_STATUSES.includes(statusString);

export default BidService;
