import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 20,
    [breakpoints.down('md')]: {
      paddingTop: 50,
    },
  },
  title: {
    ...mixins.font(20, 28, 400),
    textAlign: 'center',
    color: '#496B90',
    [breakpoints.down('md')]: {
      ...mixins.font(16, 26),
    },
  },
  subtitle: {
    ...mixins.font(30, 30, 700),
    textAlign: 'center',
    color: '#496B90',
    [breakpoints.down('md')]: {
      ...mixins.font(18, 22),
    },
  },
}));
