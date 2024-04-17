import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
  },
  input: {
    padding: 0,
  },
  span: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  },
}));
