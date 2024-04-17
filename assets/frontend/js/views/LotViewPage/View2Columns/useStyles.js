import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: -10,
  },
  center: {
    display: 'flex',
  },
  left: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
}));
