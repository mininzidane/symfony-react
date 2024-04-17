import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  status: {
    color: '#4D4D4D',
    fontSize: 11,
    lineHeight: '16px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '&.is-outbid': {
      color: '#F18A8A',
    },

    '&.is-high_bidder': {
      color: '#6FB44E',
    },
  },
  amount: {
    fontSize: 20,
    lineHeight: '22px',
    fontWeight: 700,
  },
  currency: {
    fontSize: 14,
    lineHeight: '18px',
    fontWeight: 300,
  },
}));
