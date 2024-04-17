import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: [[32, 0, 45]],
    backgroundColor: '#FFFFFF',

    [breakpoints.down('sm')]: {
      paddingBottom: 32,
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: [[0, 0, 30]],

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
      textAlign: 'center',
    },
  },
  container: {
    [breakpoints.up('lg')]: {
      maxWidth: 820,
    },
  },
}));
