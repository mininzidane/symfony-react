import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isRtl }) => ({
  swiper: {
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 4,

    '&:hover': {
      '& $navigation': {
        opacity: 1,
      },
    },
  },
  navigation: {
    opacity: 0,
    position: 'absolute',
    top: 'calc(50% - 25px)',
    transform: `scaleX(${isRtl ? -1 : 1})`,
    width: 50,
    height: 50,

    '& > img': {
      width: 10,
      height: 22,
    },

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  prev: {
    left: 20,

    '& > img': {
      marginLeft: 3,
    },
  },
  next: {
    transform: `rotate(${isRtl ? 0 : 180}deg)`,
    right: 20,

    '& > img': {
      marginRight: 3,
    },
  },
  duplicatedSlide: {},
  thumbnails: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 'calc(100% + 2px)',
    margin: -1,
  },
  thumbnail: {
    width: 'calc((100% - 2px * 5) / 5)',
    margin: 1,
    position: 'relative',
    cursor: 'pointer',

    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      border: '4px solid transparent',
      transition: 'none',
      zIndex: 1,
    },
  },
  activeThumbnail: {
    '&:after': {
      borderColor: '#2158F5',
      transition: 'border .15s ease',
    },
  },
  controls: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    display: 'flex',
  },
  largeControl: {
    marginRight: 20,
    padding: [[0, 15]],
    minWidth: 44,
    height: 44,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
}));
