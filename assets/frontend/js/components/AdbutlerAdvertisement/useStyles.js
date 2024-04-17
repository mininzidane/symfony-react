import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    position: 'relative',
  },
  ad: {
    '& img': {
      display: 'block',
    },
  },
}));
