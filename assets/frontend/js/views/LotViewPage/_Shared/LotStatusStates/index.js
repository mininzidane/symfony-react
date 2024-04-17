import LotService from 'frontend/js/api/LotService';

const LotStatusStates = {
  CA2CA_BLOCKED_STATE: 'CA2CABlocked',
  NO_BID_BLOCKED: 'noBidBlocked',
  OWNERSHIP_DOCS_BLOCKED: 'ownershipDocsBlocked',
  LIVE: 'live',
  SOLD: 'sold',
  WON: 'won',
  PENDING: 'pending',
  AWAITING_APPROVAL: 'awaitingApproval',
  FORM_STATE: 'formState',
  FORM_PRELIMINARY_BID: 'preliminaryBid',
  FORM_MISTYPED_BID: 'mistypedBid',
  FORM_COUNTER_BID: 'counterBid',
  CONFIRM_PRELIMINARY_BID: 'confirmPreliminaryBid',
  CONFIRM_INCREASE_BID: 'confirmIncreaseBid',
  CONFIRM_MAKE_AN_OFFER: 'confirmOffer',
  CONFIRM_BUY_IT_NOW: 'confirmBuyItNow',
  CONFIRM_KEEP_BID: 'confirmKeepBid',
  CONFIRM_COUNTER_BID: 'confirmCounterBid',
  CONFIRM_ACCEPT_BID: 'confirmAcceptBid',
  SUBMIT_RESPONSE: 'submitResponse',
  ERROR_UPLOAD_ID: 'errorUploadId',
  ERROR_INVALID_INCREMENT: 'errorInvalidIncrement',
  ERROR_INVALID_AMOUNT: 'errorInvalidAmount',
  ERROR_BP_INCREASE: 'errorBpIncrease',
  ERROR_INVALID_BID_AMOUNT: 'errorInvalidBidAmount',
  ERROR_NEED_UPGRADE_MEMBERSHIP: 'errorNeedUpgradeMembership',
  SUBMIT_STATE_WARNING: 'warning',
  SUBMIT_STATE_ERROR: 'error',
  SUBMIT_STATE_SUCCESS: 'success',
  getStateByLot: (lot) => {
    const { status } = lot;
    if (status === LotService.STATUS_AWAITING_APPROVAL) {
      return LotStatusStates.AWAITING_APPROVAL;
    }

    if (status === LotService.STATUS_YOU_WON) {
      return LotStatusStates.WON;
    }

    if (status === LotService.STATUS_PREBIDDING_CLOSED || status === LotService.STATUS_LIVE_BIDDING) {
      return LotStatusStates.LIVE;
    }

    if (status === LotService.STATUS_SOLD) {
      return LotStatusStates.SOLD;
    }

    return LotStatusStates.FORM_STATE;
  },
  getFormTypeByLotStatus: (lotStatus) => {
    if (LotService.isCounterBidStatus(lotStatus)) {
      return LotStatusStates.FORM_COUNTER_BID;
    }

    return LotStatusStates.FORM_PRELIMINARY_BID;
  },
};

export default LotStatusStates;
