import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  body: {
    minHeight: 'auto',
  },
  footer: {
    justifyContent: 'space-between',
  },
  applyPayment: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
  },
  wireConfirmation: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
  },
  loader: {
    minHeight: 315,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#ed5565',
    border: '2px solid #ed5565',
    padding: '12px',
  },
}));
