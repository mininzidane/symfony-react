import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: '50px 14px 14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      paddingTop: '46px',
    },
  },
  trackingBar: {
    maxWidth: '913px',
    width: '100%',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '913px',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    margin: '0 14px',
    width: '100%',
    [breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexDirection: 'column-reverse',
    },
  },
  contacts: {
    height: 'auto',
    paddingTop: '22px',
    paddingBottom: '20px',
  },
}));
