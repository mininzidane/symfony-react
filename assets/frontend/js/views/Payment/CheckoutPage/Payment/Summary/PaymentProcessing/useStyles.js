import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    display: 'block',
    position: 'relative',
    width: '48px',
    height: '48px',
  },
  svg: {
    position: 'absolute',
    top: 'calc(50% - 12px)',
    left: 'calc(50% - 8px)',
  },
  message: {
    marginTop: '10px',
  },
}));
