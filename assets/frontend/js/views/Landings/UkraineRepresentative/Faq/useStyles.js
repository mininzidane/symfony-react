import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  faq: {
    marginBottom: '55px',
    [breakpoints.down('sm')]: {
      padding: '28px 24px 15px 24px',
      marginBottom: 0,
    },
  },
  container: {
    textAlign: 'center',
    paddingTop: '18px',
    [breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  title: {
    margin: '0',
    fontSize: '32px',
    marginBottom: '10px',
    [breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  subtitle: {
    fontSize: '16px',
  },
}));
