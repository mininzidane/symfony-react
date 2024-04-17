import { makeStyles } from '@material-ui/core/styles';
import BidService from 'backend/js/api/BidService';

export default makeStyles(() => ({
  bidStatus: {
    display: 'inline-block',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: '16px',
    whiteSpace: 'nowrap',
    borderRadius: '4px',
    padding: '4px 8px',
    boxShadow: 'none',
    backgroundColor: ({ status }) => {
      if (status === BidService.STATUS_AWAITING_APPROVAL) {
        return '#23c6c8';
      }

      if (status === BidService.STATUS_AWAITING_SELLER_RESPONSE) {
        return '#1c84c6';
      }

      if (status === BidService.STATUS_SELLER_COUNTERED) {
        return '#ed5565';
      }

      return '#1ab394';
    },

    '&:hover': {
      color: '#fff',
    },
    '&:focus': {
      color: '#fff',
      outline: 'none',
    },
  },
}));
