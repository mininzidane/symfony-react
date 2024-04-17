import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: 325,
  },
  title: {
    fontSize: 20,
    lineHeight: '24px',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: '24px',
    color: '#828282',
  },
  button: {
    marginTop: 32,
    minWidth: 250,

    [breakpoints.down('sm')]: {
      marginTop: 24,
    },
  },
  icon: {
    marginBottom: 24,

    [breakpoints.down('sm')]: {
      marginBottom: 20,
    },
  },
}));
