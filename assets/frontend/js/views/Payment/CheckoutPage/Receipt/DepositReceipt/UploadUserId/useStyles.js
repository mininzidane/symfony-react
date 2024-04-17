import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '64px',
    alignItems: 'start',
    paddingBottom: '18px',
  },
  info: {
    width: '100%',
    fontWeight: '700',
    color: '#8C0C0C',
    paddingRight: '30px',
    paddingLeft: '15px',
    "[dir='rtl'] &": {
      paddingLeft: '30px',
      paddingRight: '15px',
    },
  },
  arrow: {
    width: 50,
    flexShrink: '0',
    marginTop: '3px',
    "[dir='rtl'] &": {
      transform: 'scaleX(-1)',
    },
  },
  passport: {
    width: 90,
    flexShrink: '0',
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 20px 0',
    color: '#8D8D8D',
    "[dir='rtl'] &": {
      wordBreak: 'break-all',
    },
    '& img': {
      flexShrink: '0',
      marginTop: '5px',
      width: '30px',
      marginRight: '12px',
      "[dir='rtl'] &": {
        marginLeft: '12px',
        marginRight: 0,
      },
    },
  },
}));
