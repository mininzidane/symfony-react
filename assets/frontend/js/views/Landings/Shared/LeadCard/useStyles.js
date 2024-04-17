import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    padding: [[24, 35, 34]],
    height: '100%',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',

    [breakpoints.down('lg')]: {
      order: -1,
    },

    [breakpoints.down('md')]: {
      padding: [[16, 14, 18]],
    },
  },
  title: {
    fontSize: 28,
    lineHeight: '32px',
    fontWeight: 400,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      fontSize: 24,
      lineHeight: '28px',
    },
  },
  subtitle: {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 24,

    [breakpoints.down('sm')]: {
      marginBottom: 14,
    },
  },
  submit: {
    marginTop: 20,

    [breakpoints.down('sm')]: {
      marginTop: 12,
    },
  },
  form: {
    maxWidth: 480,
    margin: '0 auto',
    height: '100%',
    minHeight: 343,

    '&.is-submitted': {
      display: 'flex',
      alignItems: 'center',
    },
  },
}));
