import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  shippingTo: {
    display: 'inline-block',
  },
  spinner: {
    marginTop: 10,
  },
  totalWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    whiteSpace: 'nowrap',
  },
  total: {
    fontSize: 16,
    lineHeight: '20px',
    paddingLeft: 5,
    paddingTop: 3,
  },
  currency: {
    fontWeight: 300,
  },
  labelWrap: {
    paddingTop: 3,
  },
  label: {
    fontWeight: 700,
  },
}));
