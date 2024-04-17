import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  loading: {
    position: 'relative',
    backgroundColor: '#fff',
    minHeight: '215px',
  },
  payoutEstimator: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '14px',
    marginTop: -8,
    '&.is-sold': {
      marginTop: 0,
      paddingTop: 10,
    },
  },
}));
