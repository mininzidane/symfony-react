import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#000000',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: '#ffffff',
    padding: [[30, 0, 36]],
    textAlign: 'center',
    overflow: 'hidden',

    [breakpoints.up('lg')]: {
      paddingBottom: 50,
    },
  },
  wrap: {
    margin: '0 -30px',
    [breakpoints.up('lg')]: {
      margin: '0',
    },
  },
  title: {
    maxWidth: '82%',
    margin: '0 auto',
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 400,

    [breakpoints.up('md')]: {
      fontSize: 23,
      lineHeight: '30px',
    },

    [breakpoints.up('lg')]: {
      maxWidth: 790,
      fontSize: 30,
      lineHeight: '40px',
    },
  },
  subtitle: {
    fontSize: 14,
    maxWidth: '82%',
    lineHeight: '18px',
    fontWeight: 400,
    margin: '6px auto auto',

    [breakpoints.up('md')]: {
      fontSize: 15,
      lineHeight: '20px',
    },

    [breakpoints.up('lg')]: {
      fontSize: 18,
      lineHeight: '24px',
    },
  },
}));
