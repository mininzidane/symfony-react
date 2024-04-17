import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    marginBottom: 4,
  },
  navigation: {
    outline: 'none',
    cursor: 'pointer',
    transition: 'background .15s ease',
    zIndex: 2,
    background: 'rgba(51, 51, 51, .65)',
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 'calc(50% - 12px)',
    width: 24,
    height: 24,

    '&:hover': {
      background: '#4F4F4F',
    },

    '& > img': {
      width: 6,
      height: 12,
    },
  },
  prev: {
    left: 14,

    '& > img': {
      marginRight: 3,
    },
  },
  next: {
    transform: `rotate(180deg)`,
    right: 14,

    '& > img': {
      marginRight: 3,
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
  },
}));
