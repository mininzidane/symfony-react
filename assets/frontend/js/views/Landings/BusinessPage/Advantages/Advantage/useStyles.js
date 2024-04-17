import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[30, 0, 0]],
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '340px',
    margin: '0 auto',
  },
  icon: {
    marginBottom: 18,
    '&.isWebsite': {
      marginBottom: 9,
    },
    '&.isRuSupport': {
      marginBottom: 12,
    },
    [breakpoints.up('sm')]: {
      marginBottom: '18px',
      height: '42px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  },
  advantage: {
    fontSize: 15,
    lineHeight: '20px',
    fontWeight: 400,
    [breakpoints.up('sm')]: {
      padding: '0 15px',
    },
  },
}));
