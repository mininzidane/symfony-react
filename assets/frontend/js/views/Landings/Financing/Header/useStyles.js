import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 18,

    [breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  rootWrapper: {
    position: 'relative',
  },
  content: {
    position: 'relative',
  },
  title: {
    ...mixins.font(42, 52, 700),
    color: '#fff',
    marginBottom: 19,

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 30, 700),
    },

    '& br': {
      [breakpoints.down('md')]: {
        display: 'none',
      },
    },
  },
  subtitle: {
    ...mixins.font(24, 30, 400),
    marginBottom: 27,

    [breakpoints.down('sm')]: {
      ...mixins.font(18, 24, 400),
    },
  },
  items: {
    display: 'flex',
    paddingBottom: 24,
    maxWidth: 640,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 'auto',

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginRight: 0,
      marginLeft: 0,
    },
  },
  action: {
    height: 105,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...mixins.font(18, 24, 600),
    position: 'relative',

    '&::before': {
      content: "''",
      height: 105,
      backgroundColor: 'rgba(0, 0, 0, .5)',
      top: 0,
      bottom: 0,
      width: '100vw',
      position: 'absolute',
    },
  },
  cta: {
    width: 224,
    position: 'relative',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  disclosure: {
    color: '#fff',
    zIndex: 1,
  },
}));
