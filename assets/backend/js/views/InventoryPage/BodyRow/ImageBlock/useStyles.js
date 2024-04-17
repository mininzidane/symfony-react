import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  largeControl: {
    outline: 'none',
    cursor: 'pointer',
    transition: 'background .15s ease',
    zIndex: 2,
    background: 'rgba(51, 51, 51, .65)',
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: [[0, 10]],
    height: 30,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    position: 'absolute',
    bottom: 15,
    left: 10,
    fontWeight: 700,
    textTransform: 'uppercase',

    '&:hover': {
      background: '#4F4F4F',
    },
  },
  navigation: {
    opacity: 1,
    display: 'block !important',
    backgroundColor: 'rgba(0,0,0, 0.65)',
    width: 30,
    height: 30,
    borderRadius: 90,
    zIndex: 2,

    '& img': {
      width: 10,
      height: 13.5,
    },
  },

  bullet: {
    borderRadius: '100%',
  },

  next: {
    right: 15,
  },

  prev: {
    left: 15,
  },
}));
