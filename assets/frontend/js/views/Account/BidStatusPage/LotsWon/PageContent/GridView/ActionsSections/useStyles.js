import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: '100%',
    marginTop: 'auto',
    padding: [[15, 14]],
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '14px',
  },
  cancelPurchase: {
    marginTop: '5px',
    textAlign: 'center',
  },
}));
