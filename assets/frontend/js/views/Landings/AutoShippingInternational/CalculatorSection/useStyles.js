import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: [[36, 0, 48]],

    [breakpoints.down('sm')]: {
      padding: [[28, 0, 40]],
    },
  },
  title: {
    ...mixins.font(36, 48),
    textAlign: 'center',
    paddingBottom: 30,

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
    },
  },
}));
