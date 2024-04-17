import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const ConsignmentService = {
  getConsignmentDetails(copartLot) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`consignment/${copartLot}/details`, true),
    ).then(({ data }) => data);
  },
  bidApprovalApprove(copartLot) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`consignment/${copartLot}/bid-approval-approve`, true),
    ).then((data) => data.data);
  },
  bidApprovalCounterbid(copartLot, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`consignment/${copartLot}/bid-approval-counterbid`, true),
      payload,
    ).then((data) => data.data);
  },
  bidApprovalStay(copartLot) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`consignment/${copartLot}/bid-approval-stay`, true),
    ).then((data) => data.data);
  },
  bidApprovalReruneligible(copartLot) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`consignment/${copartLot}/bid-approval-reruneligible`, true),
    ).then((data) => data.data);
  },
  bidApprovalRerun(copartLot, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`consignment/${copartLot}/bid-approval-rerun`, true),
      payload,
    ).then((data) => data.data);
  },
};

ConsignmentService.BID_APPROVAL_STATUSES = {
  AWAITING_YOUR_RESPONSE: 'Awaiting Your Response',
  AWAITING_BUYER_RESPONSE: 'Awaiting Buyer Response',
  BUYER_COUNTERED_BID: 'Buyer Countered Bid',
  ON_APPROVAL_BTBA: 'On Approval-BTBA',
  ON_APPROVAL_RESERVE: 'On Approval-Reserve',
  SELLER_STAYS: 'Seller Stays',
};

ConsignmentService.LOT_STATUS_CLOSED = 'Closed';
ConsignmentService.LOT_STATUS_WAITING_TO_CUT_SELLER_CHECK = 'WAITING TO CUT SELLER CHECK';
ConsignmentService.LOT_STATUS_SETTLEMENT_COMPLETE = 'SETTLEMENT COMPLETE';
ConsignmentService.LOT_STATUS_AWAITING_BID_APPROVAL = 'AWAITING BID APPROVAL';

ConsignmentService.STATUSES_TO_MARK_SYC_AS_SOLD = [
  ConsignmentService.LOT_STATUS_CLOSED,
  ConsignmentService.LOT_STATUS_WAITING_TO_CUT_SELLER_CHECK,
  ConsignmentService.LOT_STATUS_SETTLEMENT_COMPLETE,
];

export default ConsignmentService;
