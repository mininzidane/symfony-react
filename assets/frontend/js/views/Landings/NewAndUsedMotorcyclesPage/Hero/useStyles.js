import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundColor: '#5780F4',
  },
  info: {
    paddingTop: 40,
    paddingBottom: 45,
    maxWidth: 440,
    position: 'relative',
    zIndex: 2,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',

    [breakpoints.down('md')]: {
      gridTemplateColumns: '2fr 1fr',
    },

    '& > div': {
      position: 'relative',
    },
  },
  caption: {
    ...mixins.font(36, 42),
    margin: 0,
    color: '#FFF',

    [breakpoints.down('sm')]: {
      ...mixins.font(26, 32, 700),
    },
  },
  desc: {
    ...mixins.font(18, 24, 400),
    margin: [[10, 0, 0]],
    color: '#FFF',

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 21),
      maxWidth: 200,
      margin: [[10, 'auto', 0]],
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
      maxWidth: '100%',
      marginTop: 20,
    },
  },
  image: {
    marginTop: 28,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: -260,
    width: 'calc(50vw + 260px)',
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
}));
