import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '40px 15px 64px',
    backgroundColor: '#FFF',

    [breakpoints.down('md')]: {
      padding: '38px 15px 36px',
    },
  },
  title: {
    fontSize: '32px',
    fontWeight: 300,
    color: '#2B2D38',
    textAlign: 'center',

    [breakpoints.down('md')]: {
      fontSize: '24px',
      fontWeight: 400,
      marginBottom: 8,
    },
  },
  cards: {
    display: 'flex',
    maxWidth: 570,
    margin: '26px auto 0',
    width: '100%',

    [breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '0 6px',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.15)',
    borderRadius: 2,
    height: 90,
    backgroundColor: '#FFF',

    [breakpoints.down('md')]: {
      margin: '0 0 12px 0',
    },
  },
}));
