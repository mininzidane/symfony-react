import { makeStyles } from '@material-ui/core/styles';
import ConsignmentService from 'backend/js/api/ConsignmentService';

export default makeStyles(() => ({
  status: {
    color: ({ status }) => {
      if (
        status === ConsignmentService.BID_APPROVAL_STATUSES.AWAITING_YOUR_RESPONSE ||
        status === ConsignmentService.BID_APPROVAL_STATUSES.BUYER_COUNTERED_BID ||
        status === ConsignmentService.BID_APPROVAL_STATUSES.ON_APPROVAL_RESERVE ||
        status === ConsignmentService.BID_APPROVAL_STATUSES.SELLER_STAYS
      ) {
        return '#0a0';
      }

      if (status === ConsignmentService.BID_APPROVAL_STATUSES.AWAITING_BUYER_RESPONSE) {
        return '#d00';
      }

      return '#005abb';
    },
  },
}));
