import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
  },
  input: {
    height: 48,
    padding: [[12, 12, 0]],
    fontSize: 15,
  },
  label: {
    position: 'absolute',
    top: 8,
    left: 12,
    color: '#BDBDBD',
    fontSize: 12,
    pointerEvents: 'none',
  },
}));
