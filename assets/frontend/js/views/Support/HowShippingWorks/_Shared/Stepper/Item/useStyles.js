import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  stepLabel: {
    fontSize: '12px',
    color: '#434343',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingTop: 2,
  },
  left: {
    minWidth: 60,
    textAlign: 'center',
  },
  right: {
    paddingLeft: 85,

    [breakpoints.down('sm')]: {
      padding: 0,
      marginTop: 25,
      marginBottom: 50,
    },
  },
  title: {
    color: '#006A85',
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: 15,
  },
  description: {
    fontSize: '16px',
    fontWeight: 400,
  },
}));
