import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: [[40, 0, 15]],
    position: 'relative',
    minHeight: 192,

    [breakpoints.down('sm')]: {
      padding: [[20, 0, 0]],
    },
  },

  swiper: {
    margin: [[0, 50]],
  },
  bullets: {
    marginTop: 18,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  bullet: {
    ...mixins.extraHitbox(4),
    position: 'relative',
    width: 7,
    height: 7,
    margin: [[0, 4]],
    borderRadius: '50%',
    border: '1px solid #2158F5',
    outline: 'none',
    cursor: 'pointer',
  },
  activeBullet: {
    color: 'blue',
    backgroundColor: '#2158F5',
  },
  arrow: {
    position: 'absolute',
    height: 22,
    top: 114,
    outline: 'none',
    cursor: 'pointer',
    zIndex: 10,

    [breakpoints.down('sm')]: {
      top: 100,
    },
  },
  arrowLeft: {
    transform: 'translate(50%, -50%) rotate(180deg)',
    left: 10,

    [breakpoints.down('sm')]: {
      left: 7,
    },
  },
  arrowRight: {
    transform: 'translate(-50%, -50%)',
    right: 10,

    [breakpoints.down('sm')]: {
      right: 7,
    },
  },
}));
