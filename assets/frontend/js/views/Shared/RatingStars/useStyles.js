import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    '& svg': {
      width: '100%',
      height: 'auto',
      maxHeight: '100%',
    },
  },
}));
