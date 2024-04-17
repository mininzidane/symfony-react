import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 14,
  },
  fullWidth: {
    gridColumn: 'span 2',
  },
  submit: {
    background: '#E6ECFD',
    borderRadius: 6,
    padding: 14,
    gridColumn: 'span 2',
  },
}));
