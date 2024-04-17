import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    '@media (max-width: 1440px)': {
      maxWidth: 1140,
      margin: '0 auto',
    },
    [breakpoints.down('lg')]: {
      maxWidth: 974,
    },
    [breakpoints.down('md')]: {
      maxWidth: 740,
    },
  },
  container: {
    position: 'relative',
    paddingTop: 34,
    paddingBottom: 70,
    zIndex: 2,
    [breakpoints.down('lg')]: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    [breakpoints.down('sm')]: {
      paddingTop: 22,
      paddingBottom: 25,
    },
  },
  containerWrapper: {
    backgroundSize: 'auto 100% !important',

    [breakpoints.down('sm')]: {
      backgroundSize: 'cover !important',
    },
  },
  caption: {
    textAlign: 'center',

    '& > *': {
      color: '#FFF',
      margin: 0,
    },
  },
  title: {
    fontSize: 38,
    lineHeight: '50px',
    fontWeight: 700,

    [breakpoints.down('sm')]: {
      fontSize: 24,
      lineHeight: '32px',
    },
  },
  subtitle: {
    marginTop: 5,
    fontSize: 24,
    lineHeight: '32px',
    fontWeight: 300,

    [breakpoints.down('sm')]: {
      fontSize: 16,
      lineHeight: '21px',
    },
  },
  brXlUp: {
    [breakpoints.down('lg')]: {
      display: 'none',
    },
  },
}));
