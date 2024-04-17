import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(16, 20, 400),
    paddingTop: 20,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}));
