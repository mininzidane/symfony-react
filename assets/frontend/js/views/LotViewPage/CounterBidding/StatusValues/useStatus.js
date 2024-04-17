import ConsignmentService from 'frontend/js/api/ConsignmentService';

function useStatus(consignment) {
  const { lotStatus, bidApprovalStatus } = consignment;
  const status = lotStatus === ConsignmentService.LOT_STATUS_AWAITING_BID_APPROVAL ? bidApprovalStatus : lotStatus;
  const colors = {};
  if (
    status === ConsignmentService.BID_APPROVAL_STATUSES.AWAITING_YOUR_RESPONSE ||
    status === ConsignmentService.BID_APPROVAL_STATUSES.BUYER_COUNTERED_BID ||
    status === ConsignmentService.BID_APPROVAL_STATUSES.ON_APPROVAL_RESERVE ||
    status === ConsignmentService.BID_APPROVAL_STATUSES.SELLER_STAYS
  ) {
    colors.status = '#226900'; // green
  } else if (status === ConsignmentService.BID_APPROVAL_STATUSES.AWAITING_BUYER_RESPONSE) {
    colors.status = '#B00'; // red
  }

  return { status, colors };
}

export default useStatus;
