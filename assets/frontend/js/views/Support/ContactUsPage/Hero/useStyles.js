import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    paddingTop: 30,
    paddingBottom: 36,
    overflow: 'hidden',
    position: 'relative',

    [breakpoints.down('sm')]: {
      paddingTop: 20,
      paddingBottom: 28,
    },
  },
  main: {
    maxWidth: '56%',
    position: 'relative',
    zIndex: 3,

    [breakpoints.down('lg')]: {
      maxWidth: '50%',
    },

    [breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  title: {
    ...mixins.font(42, 48, 700),
    margin: 0,

    [breakpoints.down('lg')]: {
      ...mixins.font(36, 42),
    },

    [breakpoints.down('md')]: {
      ...mixins.font(28, 34),
    },

    [breakpoints.down('md')]: {
      ...mixins.font(24, 32),
    },
  },
  desc: {
    ...mixins.font(22, 32, 400),
    color: '#828282',
    marginTop: 10,

    [breakpoints.down('lg')]: {
      ...mixins.font(18, 24),
    },

    [breakpoints.down('md')]: {
      ...mixins.font(14, 20),
      marginTop: 5,
    },
  },
  card: {
    alignSelf: 'center',
    marginTop: 35,

    [breakpoints.down('lg')]: {
      marginTop: 25,
    },

    [breakpoints.down('md')]: {
      marginTop: 20,
    },
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    height: '100%',
    left: '45%',
    width: '15%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(90deg, #F1F1F8 45.33%, rgba(241, 241, 248, 0) 100%)',
    pointerEvents: 'none',
    zIndex: 2,
    filter: 'blur(5px)',
  },
}));
