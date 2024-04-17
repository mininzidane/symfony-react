import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundColor: '#5780F4',
    position: 'relative',
    backgroundPosition: 'center',
    backgroundSize: 'cover',

    [breakpoints.down('sm')]: {
      textAlign: 'center',
      paddingBottom: 25,
    },
  },
  info: {
    paddingTop: 40,
    paddingBottom: 45,
    maxWidth: 420,
    position: 'relative',
    zIndex: 2,

    [breakpoints.down('sm')]: {
      paddingTop: 30,
      paddingBottom: 30,
    },
  },
  grid: {
    minHeight: 440,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',

    [breakpoints.down('md')]: {
      gridTemplateColumns: '2fr 1fr',
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      minHeight: 0,
    },

    '& > div': {
      position: 'relative',
    },
  },
  backgroundWrap: {
    height: '100%',
  },
  caption: {
    ...mixins.font(36, 42),
    margin: 0,
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(26, 32, 700),
      justifyContent: 'center',
    },

    '& img': {
      margin: [[3, 14, 0, 0]],
    },
  },
  desc: {
    ...mixins.font(18, 24, 400),
    margin: [[10, 0, 0]],
    color: '#FFF',

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 21),
      margin: [[18, 'auto', 0]],
    },
  },
  cta: {
    minWidth: 240,
    marginTop: 30,
    width: 'auto',
    color: '#2058F5 !important',
    border: '1px solid #2058F5',
    display: 'inline-block',

    [breakpoints.down('lg')]: {
      marginTop: 25,
      width: '100%',
    },
  },
  image: {
    marginTop: 28,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: -200,
    width: 'calc(50vw + 200px)',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom left',
    height: '100%',

    [breakpoints.down('lg')]: {
      left: -160,
    },
  },
  mobileSection: {
    textAlign: 'center',
    padding: [[35, 14, 40]],
    backgroundSize: 'cover',
  },
  map: {
    position: 'absolute',
    zIndex: 30,
    top: 30,
    right: 150,

    [breakpoints.down('lg')]: {
      width: 210,
      top: 85,
      right: 80,
    },

    [breakpoints.down('md')]: {
      width: 180,
      top: 100,
      right: 30,
    },

    [breakpoints.down('md')]: {
      position: 'static',
      width: '230',
    },
  },
}));
