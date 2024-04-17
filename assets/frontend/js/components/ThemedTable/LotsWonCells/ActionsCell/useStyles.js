import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    minWidth: '160px',
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
  cta: {
    [breakpoints.down('sm')]: {
      order: 1,
    },
  },
  amount: {
    textAlign: 'center',
    display: 'block',
  },
  cancelPurchase: {
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '5px',
  },
}));
