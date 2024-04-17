import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'fixed',
    right: 0,
    left: 0,
    top: 0,
    bottom: 56,
    zIndex: 50000,
    outline: 'none',
    backgroundColor: 'rgba(0, 0, 0, .75)',
  },
}));
