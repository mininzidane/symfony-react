import BaseApiService, { BaseApiServiceInstance } from 'backend/js/api/BaseApiService';

const ConsignmentService = {
  getConsignments(params) {
    const queryString = BaseApiService.objectToQueryParams(params);

    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/consignment?${queryString}`),
    ).then((data) => data.data);
  },
  getCopartNotes(id) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/consignment/${id}/copart-notes`),
    ).then((data) => data.data);
  },
  addNote(id, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/consignment/${id}/add-note`),
      payload,
    ).then((data) => data.data);
  },
  bidApprovalApprove(id) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/consignment/${id}/bid-approval-approve`),
    ).then((data) => data.data);
  },
  bidApprovalCounterbid(id, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/consignment/${id}/bid-approval-counterbid`),
      payload,
    ).then((data) => data.data);
  },
  bidApprovalStay(id) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/consignment/${id}/bid-approval-stay`),
    ).then((data) => data.data);
  },
  bidApprovalReruneligible(id) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/consignment/${id}/bid-approval-reruneligible`),
    ).then((data) => data.data);
  },
  bidApprovalRerun(id, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/consignment/${id}/bid-approval-rerun`),
      payload,
    ).then((data) => data.data);
  },
  bidApprovalVirtualbidlog(id) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/consignment/${id}/virtualbidlog`),
    ).then((data) => data.data);
  },
  copartCharges(id) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/consignment/${id}/copart-charges`),
    ).then((data) => data.data);
  },
  getTabsOverview(params) {
    const queryString = BaseApiService.objectToQueryParams(params);

    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/consignment/tabs?${queryString}`),
    ).then((data) => data.data);
  },
};

ConsignmentService.LOT_STATUSES = {
  AT_YARD_AWAITING_RECEIVING: 'AT YARD-AWAITING RECEIVING',
  AWAITING_BID_APPROVAL: 'AWAITING BID APPROVAL',
  AWAITING_CLEAR_FOR_PICKUP: 'AWAITING CLEAR FOR PICKUP',
  CANCELLED_WAITING_SELR_BILLING: 'CANCELLED-WAITING SELR BILLING',
  CLOSED: 'Closed',
  CLOSED_CANCELLED: 'Closed - CANCELLED',
  CLOSED_OWNER_RETAINED: 'Closed - OWNER RETAINED',
  LEGAL_DEPT_HOLD: 'LEGAL DEPT HOLD',
  OWNER_RETAIN_TO_BE_PU: 'OWNER RETAIN-TO BE P/UP',
  PENDING_ARRIVAL_NO_PICKUP: 'PENDING ARRIVAL-NO PICKUP',
  READY_FOR_AUCTION: 'READY FOR AUCTION',
  SELLER_HOLD_PROGRAM: 'SELLER HOLD PROGRAM',
  TITLE_TO_BE_SENT_TO_STATE: 'TITLE TO BE SENT TO STATE',
  WAITING_FOR_BUYER_PAYMENT: 'WAITING FOR BUYER PAYMENT',
  WAITING_FOR_ORIGINAL_TITLE: 'WAITING FOR ORIGINAL TITLE',
  WAITING_FOR_TITLE_FROM_STATE: 'WAITING FOR TITLE FROM STATE',
  WAITING_FOR_TRANSFERABLE_TITLE: 'WAITING FOR TRANSFERABLE TITLE',
  WAITING_TO_CUT_SELLER_CHECK: 'WAITING TO CUT SELLER CHECK',
};

ConsignmentService.BID_APPROVAL_STATUSES = {
  AWAITING_YOUR_RESPONSE: 'Awaiting Your Response',
  AWAITING_BUYER_RESPONSE: 'Awaiting Buyer Response',
  BUYER_COUNTERED_BID: 'Buyer Countered Bid',
  ON_APPROVAL_BTBA: 'On Approval-BTBA',
  ON_APPROVAL_RESERVE: 'On Approval-Reserve',
  SELLER_STAYS: 'Seller Stays',
};

ConsignmentService.TAB_STATUS_MAP = {
  TAB_BID_APPROVAL: [ConsignmentService.LOT_STATUSES.AWAITING_BID_APPROVAL],
};

ConsignmentService.CATEGORY_TEMPLATE = 'consignment';

export default ConsignmentService;
