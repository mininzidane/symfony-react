import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
  },
  image: {
    display: 'block',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  message: {
    maxWidth: 255,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: '22px',
    color: '#FFF',
    paddingTop: 8,
  },
  button: {
    fontWeight: 700,
    borderBottom: '1px dashed rgba(255, 255, 255, .6)',

    '&:hover': {
      borderBottomColor: 'transparent',
    },
  },
}));
