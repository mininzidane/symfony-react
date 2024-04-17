import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: '45px 14px 14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      paddingTop: '40px',
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 1072,
    margin: '0 14px',
    width: '100%',
    [breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexDirection: 'column-reverse',

      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
      borderRadius: '4px',
    },
  },
  pickupInfo: {
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    width: '100%',
    [breakpoints.down('sm')]: {
      boxShadow: 'none',
    },
  },
  contacts: {
    height: 'auto',
    paddingTop: '22px',
    paddingBottom: '20px',
  },
  icon: {
    width: 47,
    height: 47,
    marginTop: 4,
    marginBottom: 14,
    backgroundColor: '#4A9029',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    [breakpoints.down('sm')]: {
      width: 32,
      height: 32,
      marginTop: 0,
      marginBottom: 11,
    },
  },
  moneyIcon: {
    display: 'block',
    position: 'relative',
    top: '-1px',
    [breakpoints.down('sm')]: {
      width: 21,
      height: 13,
    },
  },
  card: {
    padding: '14px 20px',
    marginLeft: 14,
    width: '100%',
    maxWidth: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#fff',
    boxShadow: '0px 1px 2px rgb(0 0 0 / 20%)',
    borderRadius: '4px',
    [breakpoints.down('sm')]: {
      margin: '0',
      paddingBottom: 6,
      boxShadow: 'none',
      maxWidth: '100%',
    },
  },
  cardIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
    marginTop: '20px',
    [breakpoints.down('sm')]: {
      height: 'auto',
      marginBottom: '16px',
      marginTop: '12px',
      '& img': {
        width: 142,
        height: 86,
      },
    },
  },
  cardContent: {
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    paddingBottom: '30px',
    [breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '18px',
      paddingBottom: '18px',
    },
  },
  cardAmount: {
    fontSize: '39px',
    fontWeight: '700',
    lineHeight: '39px',
    marginBottom: '13px',
    marginTop: '4px',
    [breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '28px',
      marginTop: '0',
      marginBottom: '6px',
    },
  },
}));
