import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100vw',
    zIndex: 30,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
}));
