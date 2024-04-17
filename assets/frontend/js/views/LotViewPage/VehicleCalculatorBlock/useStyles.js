import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 25,

    [breakpoints.down('sm')]: {
      paddingBottom: 20,
    },
  },
}));
