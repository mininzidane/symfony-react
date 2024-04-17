import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#EFF6FE',

    [breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
  grid: {
    height: 270,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    [breakpoints.down('sm')]: {
      height: 250,
    },
  },
  title: {
    margin: 0,
    fontSize: '32px',
    color: '#000',
    lineHeight: '36px',
    fontWeight: 400,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      fontSize: 24,
      lineHeight: '32px',
    },
  },
  button: {
    width: 230,
    marginTop: 28,
  },
}));
