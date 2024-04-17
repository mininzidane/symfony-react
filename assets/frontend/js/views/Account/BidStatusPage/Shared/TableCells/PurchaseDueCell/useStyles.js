import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
  amount: {
    textAlign: 'center',
    display: 'block',
  },
  cancelPurchase: {
    textAlign: 'center',
    marginTop: '5px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
}));
