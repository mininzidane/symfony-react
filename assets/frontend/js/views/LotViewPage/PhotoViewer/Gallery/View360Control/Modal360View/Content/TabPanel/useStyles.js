import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    visibility: 'hidden',
    width: 0,
    height: 0,
    overflow: 'hidden',

    '&.is-active': {
      position: 'relative',
      visibility: 'visible',
      width: '100%',
      height: 'auto',
    },
  },
}));
