import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  photoContainer: {
    backgroundColor: '#E0E0E0',
    position: 'relative',
    paddingBottom: '75%',
  },
  zoom: {
    position: 'absolute',
    bottom: 18,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 4,
    backgroundColor: '#898989',

    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  viewAll: {
    position: 'absolute',
    bottom: 18,
    left: 84,
    width: 132,
    height: 44,
    borderRadius: 4,
    backgroundColor: '#898989',

    [breakpoints.down('sm')]: {
      height: 40,
      left: 14,
      borderRadius: 20,
      width: 94,
    },
  },
  view360: {
    position: 'absolute',
    bottom: 18,
    left: 235,
    width: 44,
    height: 44,
    borderRadius: 4,
    backgroundColor: '#898989',

    [breakpoints.down('sm')]: {
      left: 'auto',
      right: 14,
    },
  },
  thumbnails: {
    marginTop: 4,
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: 2,

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  thumbnail: {
    backgroundColor: '#E0E0E0',
    paddingBottom: '75%',

    '&.is-active': {
      border: '2px solid #017DD6',
    },
  },
  dots: {
    position: 'absolute',
    bottom: 34,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
    display: 'none',

    [breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    margin: [[0, 5]],

    '&.is-active': {
      width: 5,
      height: 5,
    },
  },
}));
