import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    marginTop: 24,

    [breakpoints.down('sm')]: {
      marginTop: 8,
    },
  },
  title: {
    ...mixins.font(28, 36, 700),
    margin: 0,
    color: '#333',

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20),
    },
  },
  subtitle: {
    ...mixins.font(16, 20, 400),
    margin: [[8, 0, 0]],
    color: '#828282',

    [breakpoints.down('sm')]: {
      ...mixins.font(12, 16),
      marginTop: 5,
    },
  },
}));
