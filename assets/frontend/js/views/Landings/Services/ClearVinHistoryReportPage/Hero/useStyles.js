import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 280,
    maxWidth: 'none',

    [breakpoints.down('sm')]: {
      height: 'auto',
      paddingBottom: '50px',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 0,
  },
  title: {
    ...mixins.font(32, 46, 700),
    color: '#fff',
    textAlign: 'center',
    margin: '10px 0 0',

    [breakpoints.down('lg')]: {
      ...mixins.font(30, 36),
    },

    [breakpoints.down('md')]: {
      ...mixins.font(28, 36),
      margin: '15px 0 0',
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 31),
    },
  },
  logo: {
    width: 'auto',
    marginTop: 45,

    [breakpoints.down('md')]: {
      margin: '45px 0 0',
    },

    [breakpoints.down('sm')]: {
      height: '30px',
      marginTop: '50px',
    },
  },
  desc: {
    ...mixins.font(20, 27),
    color: '#fff',
    margin: '16px 0 0',
    textAlign: 'center',
    paddingBottom: 60,

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 21),
      paddingBottom: 0,
    },
  },
}));
