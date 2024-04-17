import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    '&.has-files': {
      ...mixins.font(16, 20, 700),
      height: 114,
      padding: 8,
      color: '#2158F5',

      [breakpoints.down('sm')]: {
        height: 90,
      },
    },
  },
  icon: {},
  button: {
    textTransform: 'uppercase',
    margin: [['auto', 'auto', 0]],
    minWidth: '100%',
    width: 'auto',

    [breakpoints.down('sm')]: {
      marginTop: '16px',
    },
  },
  title: {
    ...mixins.font(16, 24, 700),
    color: '#333',
    marginTop: 15,

    [breakpoints.down('sm')]: {
      lineHeight: '20px',
      marginTop: 12,
    },
  },
  desc: {
    ...mixins.font(12, 18, 400),
    marginTop: 6,
    color: '#828282',
  },
  stepLabel: {
    ...mixins.font(24, 32, 700),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    color: '#2158F5',
    textTransform: 'uppercase',
    marginTop: 26,
    height: 40,

    '& img': {
      marginRight: 10,
    },

    [breakpoints.down('md')]: {
      ...mixins.font(18, 24),
      marginTop: 2,
    },
  },
  content: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  uploadMore: {
    ...mixins.font(14, 20, 400),
    color: '#2158F5',
    width: '100%',
    textAlign: 'left',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
}));
