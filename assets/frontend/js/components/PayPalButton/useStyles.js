import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  processing: {
    display: 'block',
    position: 'absolute',
    top: 'calc(50% - 10px)',
    left: '15px',
    zIndex: 99999,
  },
}));
