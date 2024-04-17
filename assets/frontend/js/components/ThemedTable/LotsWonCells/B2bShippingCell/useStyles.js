import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    textAlign: 'center',

    '&.is-card-view': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  spinner: {
    marginTop: 10,
  },
  btn: {
    marginTop: 4,
    textAlign: 'center',
  },
  paid: {
    marginTop: 6,
  },
  amount: {
    color: '#4A9029',
  },
  shipTo: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
}));
