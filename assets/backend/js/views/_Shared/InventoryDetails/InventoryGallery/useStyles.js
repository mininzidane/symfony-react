import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  thumbnails: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 'calc(100% + 2px)',
    margin: -1,
  },
  thumbnail: {
    all: 'unset',
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
      border: '2px solid transparent',
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
}));
