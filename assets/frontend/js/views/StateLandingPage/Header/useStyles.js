import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    background: 'white',
    height: 72,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
  },
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: '#454545',

    [breakpoints.down('lg')]: {
      fontSize: 18,
    },

    [breakpoints.down('md')]: {
      fontSize: 16,
      lineHeight: '22px',
      maxWidth: 227,
    },

    [breakpoints.down('sm')]: {
      fontSize: 11,
      lineHeight: 'normal',
      marginTop: 10,
      maxWidth: 'none',
      whiteSpace: 'nowrap',
    },
  },
  logo: {
    height: 38,

    [breakpoints.down('lg')]: {
      height: 42,
    },

    [breakpoints.down('sm')]: {
      height: 30,
    },
  },
}));
