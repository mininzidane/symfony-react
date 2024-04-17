import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: [[20, 0]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      paddingBottom: 14,
    },
  },
  title: {
    ...mixins.font(20, 28, 700),
    marginTop: 22,
  },
  subtitle: {
    ...mixins.font(16, 24, 400),
    marginTop: 10,
  },
}));
