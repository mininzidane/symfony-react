import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  carousel: {
    [breakpoints.up('md')]: {
      marginBottom: 4,
    },
  },
  navigation: {
    top: 'calc(50% - 15px)',
    height: 30,
    width: 30,

    '& > img': {
      width: 14,
      height: 14,
    },

    [breakpoints.up('md')]: {
      '& > img': {
        width: 20,
        height: 20,
      },
    },

    [breakpoints.up('lg')]: {
      top: 'calc(50% - 21px)',
      width: 42,
      height: 42,
    },
  },
  position: {
    [breakpoints.up('md')]: {
      display: 'none',
    },
  },
  thumbnails: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 'calc(100% + 2px)',
    margin: [[-5, -1]],

    [breakpoints.down('md')]: {
      margin: [[-2, -1]],
    },

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  thumbnail: {
    width: 'calc((100% - 2px * 5) / 5)',
    margin: [[5, 1]],
    position: 'relative',
    cursor: 'pointer',

    [breakpoints.down('md')]: {
      margin: [[2, 1]],
    },

    '& img': {
      objectFit: 'cover',
    },

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
    padding: [[0, 25]],
    width: '100%',
    bottom: 20,
    display: 'flex',

    [breakpoints.down('md')]: {
      padding: [[0, 15]],
      bottom: 15,
    },
  },
}));
