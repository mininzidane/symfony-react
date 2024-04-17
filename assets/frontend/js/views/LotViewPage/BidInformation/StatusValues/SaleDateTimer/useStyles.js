import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  timer: {
    color: '#B00000',
  },
  liveAuctionLabel: {
    fontWeight: '700',
    textDecoration: 'none',
    color: '#4A9029',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
