import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    height: 14,
  },
  lineContainer: {
    position: 'absolute',
    left: 0,
    top: 6,
    height: 2,
    width: '100%',
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: '#2158F5',
  },
  dot: {
    position: 'relative',
    zIndex: 2,
  },
}));
