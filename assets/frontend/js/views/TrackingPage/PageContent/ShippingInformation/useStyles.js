import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  sublot: {
    paddingTop: '0 !important',
    borderTop: 'none !important',
  },
  card: {
    '& > div': {
      '&:first-child': {
        paddingTop: 0,
      },
      '&:last-child': {
        paddingBottom: 0,
      },
    },
  },
  value: {
    display: 'inline-block',
    marginRight: 4,
  },
  shippingInformation: {
    [breakpoints.down('sm')]: {
      order: 2,
    },
  },
}));
