import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
  },
  editButton: {
    top: 0,
    right: 0,
    position: 'absolute',
    width: 40,
    height: '100%',
    maxHeight: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '& img': {
      display: 'block',
    },
    '&:hover': {
      opacity: '0.8',
    },
  },
}));
