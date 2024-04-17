import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 45,

    [breakpoints.down('sm')]: {
      paddingBottom: 30,
    },
  },
}));
