import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    position: 'relative',
    height: 360,
    backgroundColor: '#F1F1F8',
    overflow: 'hidden',

    [breakpoints.down('sm')]: {
      height: 350,
      backgroundColor: '#FFF',
    },
  },
  container: {
    maxWidth: 1460,
    position: 'relative',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,

    [breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  info: {
    position: 'relative',
    zIndex: 2,
    marginTop: -30,
    maxWidth: 820,

    '@media(max-width: 1400px)': {
      maxWidth: 600,
    },

    [breakpoints.down('lg')]: {
      marginTop: -60,
    },

    [breakpoints.down('md')]: {
      maxWidth: 450,
    },

    [breakpoints.down('sm')]: {
      maxWidth: 330,
      textAlign: 'center',
      marginTop: -115,
    },
  },
  title: {
    ...mixins.font(40, 52, 400),
    margin: 0,

    [breakpoints.down('md')]: {
      ...mixins.font(36, 42, 400),
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      color: '#FFF',
    },
  },
  subtitle: {
    ...mixins.font(18, 24, 400),
    marginTop: 6,
    margin: 0,

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 22, 400),
      color: '#FFF',
      marginTop: 15,
    },
  },
  cta: {
    marginTop: 25,
  },
  arc: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
}));
