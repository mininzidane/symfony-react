import ImageNotFound from 'frontend/images/shared/errors/image-not-found.svg';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    height: 0,
    width: '100%',
    overflow: 'hidden',
  },
  staticBlock: {
    height: 'auto !important',
    position: 'static !important',
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  img: ({ isBlurred }) => ({
    display: 'inline-block',
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    height: '100%',
    filter: isBlurred ? 'blur(16px)' : null,
    pointerEvents: isBlurred ? 'none' : 'all',

    '&:not([src])': {
      visibility: 'hidden',
    },
  }),
  placeholder: {
    '&:before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      backgroundColor: '#e5e5ec',
    },
  },
  fallback: {
    '&:after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
      backgroundColor: '#f2f2f2',
      backgroundImage: `url(${ImageNotFound})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  },
}));
