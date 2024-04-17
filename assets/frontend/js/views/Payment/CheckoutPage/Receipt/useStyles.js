import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginTop: 40,
    paddingBottom: 15,
    [breakpoints.down('sm')]: {
      marginTop: 14,
    },
  },
}));
