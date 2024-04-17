import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: '250px',
  },
  notes: {
    maxHeight: 150,
    overflowY: 'scroll',
  },
}));
