import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 170,
    marginTop: 25,
    backgroundColor: '#E9E9EF',
    padding: [[30, 20, 40]],
    borderRadius: 4,

    [breakpoints.down('sm')]: {
      marginTop: 20,
    },
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: '24px',
    color: '#000000',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: '20px',
    color: '#777777',
    textAlign: 'center',
  },
}));
