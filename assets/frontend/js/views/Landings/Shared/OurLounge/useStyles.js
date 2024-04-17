import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  container: {
    maxWidth: 960,
    margin: [[0, 'auto']],
    padding: [[0, 100, 75]],

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      padding: [[0, 14, 48]],
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: 0,
    padding: [[42, 0, 15]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      padding: [[24, 0, 20]],
    },
  },
  carousel: {
    paddingBottom: '48.75%',
    borderRadius: 40,
  },
  position: {
    bottom: -32,

    '& > span': {
      backgroundColor: '#BDBDBD',
      width: 8,
      height: 8,

      '&.is-active': {
        transform: 'scale(1)',
        backgroundColor: '#2058F5',
      },
    },
  },
  background: {
    position: 'absolute',
    left: '-49px',
    right: '-49px',
    transform: 'translateY(-50%)',
    top: '50%',
    maxWidth: 'calc(100% + 98px)',
  },
  wrap: {
    position: 'relative',
  },
  prev: {
    left: -80,
    backgroundColor: '#2058F5',
    borderRadius: '50%',
    opacity: 0.3,

    '&:hover': {
      opacity: 1,
    },

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  next: {
    transform: 'rotate(180deg)',
    right: -80,
    backgroundColor: '#2058F5 !important',
    borderRadius: '50%',
    opacity: 0.3,

    '&:hover': {
      opacity: 1,
    },

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
