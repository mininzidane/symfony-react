import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  shippingTo: {
    display: 'inline-block',
  },
  spinner: {
    marginTop: 10,
  },
  amount: {
    color: '#4A9029',
    ...mixins.font(12, 18, 400),
  },
}));
