import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  card: {
    background: '#1139A9',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    padding: '46px 34px 34px 34px',
    margin: '0 auto',
    color: '#FFFFFF',
    fontSize: '16px',
    lineHeight: '24px',
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('md')]: {
      padding: '36px 24px 24px 24px',
    },
  },
  cardTitle: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 0,
    marginBottom: '12px',
    [breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
  cardDesc: {
    color: '#FFFFFF',
  },
}));
