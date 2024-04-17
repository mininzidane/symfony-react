import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginBottom: '36px',
    padding: '0 24px',
    [breakpoints.down('sm')]: {
      padding: 0,
      marginBottom: '22px',
    },
  },
  title: {
    fontWeight: '700',
    fontSize: '28px',
    lineHeight: '39px',
    textAlign: 'center',
    color: '#333333',
    [breakpoints.down('sm')]: {
      fontSize: '20px',
      lineHeight: '30px',
    },
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: '24px',
    textAlign: 'center',
    color: '#828282',
    [breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '18px',
      marginTop: '12px',
    },
  },
}));
