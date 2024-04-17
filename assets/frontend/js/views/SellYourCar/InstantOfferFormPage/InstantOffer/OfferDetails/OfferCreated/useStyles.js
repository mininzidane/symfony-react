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
  cards: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '730px',
    borderRadius: '4px',
    margin: '0 14px',
    width: '100%',
    [breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexDirection: 'column',
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
      overflow: 'hidden',
    },
  },
  card: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    padding: '14px',
    margin: '0 10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('sm')]: {
      margin: '0',
      borderRadius: '0',
      boxShadow: 'none',
      '&:first-child': {
        paddingBottom: '4px',
      },
    },
  },
  cardIcon: {
    height: 94,
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
    marginBottom: '22px',
    [breakpoints.down('sm')]: {
      height: 'auto',
      paddingTop: '10px',
      marginBottom: '12px',
    },
  },
  cardContent: {
    fontSize: '16px',
    lineHeight: '24px',
    marginBottom: 'auto',
    marginTop: 'auto',
    paddingBottom: 16,
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      fontSize: '14px',
      paddingBottom: '9px',
    },
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '27px',
    marginBottom: '2px',
    [breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: '24px',
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
      marginBottom: '2px',
    },
  },
  cardFooter: {
    backgroundColor: '#E6ECFD',
    borderRadius: '6px',
    padding: '14px 24px',
    marginTop: 'auto',
    [breakpoints.down('sm')]: {
      padding: '12px 24px',
    },
  },
}));
