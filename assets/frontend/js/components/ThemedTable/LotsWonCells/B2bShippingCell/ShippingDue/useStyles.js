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
  cta: {
    textAlign: 'center',
  },
}));
