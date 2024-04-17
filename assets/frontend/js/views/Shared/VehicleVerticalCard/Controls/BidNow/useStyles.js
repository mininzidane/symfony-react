import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -3,
  },
  caption: {
    ...mixins.font(14, 24, 400),
    display: 'flex',
  },
  valueWrap: {
    display: 'flex',
  },
  value: {
    ...mixins.font(18, 24, 700),
  },
  currency: {
    ...mixins.font(18, 24, 300),
  },
  button: {
    marginTop: 10,
  },
  maxBid: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '6px 0 15px',
  },
}));
