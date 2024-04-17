import { makeStyles } from '@material-ui/core/styles';
import BidService from 'backend/js/api/BidService';

export default makeStyles(() => ({
  tableContainer: {
    paddingBottom: '70px',
  },
  activity: {
    width: 250,
  },
  bidInfo: {
    width: 270,
  },
  row: {
    [`&.${BidService.STATUS_AWAITING_APPROVAL.replace(/\s/g, '-')}`]: {
      background: '#EDFDFF !important',
    },
    [`&.${BidService.STATUS_AWAITING_SELLER_RESPONSE.replace(/\s/g, '-')}`]: {
      background: '#E3F2FF !important',
    },
    [`&.${BidService.STATUS_SELLER_COUNTERED.replace(/\s/g, '-')}`]: {
      background: '#FFEDEF !important',
    },
  },
}));
