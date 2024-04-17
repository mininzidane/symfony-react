import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: [[40, 0, 60]],
    backgroundColor: '#537CF5',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    [breakpoints.down('sm')]: {
      padding: [[24, 0, 36]],
    },
  },
  title: {
    ...mixins.font(32, 40, 400),
    color: '#FFF',
    textAlign: 'center',
    margin: 0,

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
      paddingRight: 30,
      paddingLeft: 30,
    },
  },
  form: {
    marginTop: 40,

    [breakpoints.down('sm')]: {
      marginTop: 25,
    },
  },
}));
