import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',
  },
  slides: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    touchAction: 'pan-y',
    paddingBottom: '75%',
    zIndex: 1,
  },
  slide: {
    position: 'absolute',
    width: '100%',
    height: '100%',

    background: '#e5e5ec',

    transition: 'transform 0.3s',

    '& img': {
      display: 'inline-block',
      maxWidth: '100%',
      maxHeight: '100%',
      width: '100%',
      height: '100%',
      objectFit: 'cover',

      "&:not([src]), &[src='']": {
        visibility: 'hidden',
      },
    },

    '&[data-position="left"]': {
      transform: 'translate3d(-100%, 0, 0)',
    },

    '&[data-position="center"]': {
      transform: 'translate3d(0, 0, 0)',
    },

    '&[data-position="right"]': {
      transform: 'translate3d(100%, 0, 0)',
    },
  },
  navigation: {
    outline: 'none',
    opacity: 1,
    cursor: 'pointer',
    transition: 'all .15s ease',
    position: 'absolute',
    zIndex: 1,
    top: 'calc(50% - 12px)',
    width: 24,
    height: 24,
    background: 'rgba(0, 0, 0, .4)',
    borderRadius: [[0, 4, 4, 0]],
    userSelect: 'none',

    '& > img': {
      width: 10,
      height: 10,
    },

    '&:hover': {
      background: 'rgba(0, 0, 0, .75)',
    },
  },
  prev: {},
  next: {
    transform: 'rotate(180deg)',
    right: 0,
  },
  position: {
    textAlign: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 25,
    zIndex: 1,
    color: '#fff',
    fontWeight: 600,
  },
  bullet: {
    outline: 'none',
    display: 'inline-block',
    cursor: 'pointer',
    width: 4,
    height: 4,
    borderRadius: '100%',
    backgroundColor: 'white',
    margin: [[0, 4]],
    transition: 'none',
    position: 'relative',

    '&:hover': {
      backgroundColor: '#2158F5',
    },

    '&:after': {
      content: '""',
      position: 'absolute',
      top: -4,
      right: -4,
      bottom: -4,
      left: -4,
    },

    '&.is-active': {
      transform: 'scale(2)',
      transition: 'transform .15s ease',
      pointerEvents: 'none',
    },

    [breakpoints.down('sm')]: {
      width: 3,
      height: 3,
    },
  },
}));
